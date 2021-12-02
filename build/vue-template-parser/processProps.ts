import generate from '@babel/generator';
import * as bt from '@babel/types';
import { getComments } from './jscomments';
import { PropType, PropsResult } from './index';
import { runFunction } from './helper';

export function processPropValue(
  propValueNode: bt.Node,
  result: PropsResult,
  source: string
): void {
  if (isAllowPropsType(propValueNode)) {
    result.type = getTypeByTypeNode(propValueNode);
  } else if (bt.isObjectExpression(propValueNode)) {
    if (!propValueNode.properties.length) return;

    const allPropNodes = propValueNode.properties;

    const typeNode: any[] = allPropNodes.filter((node: any) => {
      if (node.key.name === 'type') {
        return true;
      }
      return false;
    });
    const otherNodes = allPropNodes.filter((node: any) => {
      if (node.key.name !== 'type') {
        return true;
      }
      return false;
    });

    // Prioritize `type` before processing `default`.
    // Because the difference in `type` will affect the way `default` is handled.
    if (typeNode.length > 0) {
      result.type = getTypeByTypeNode(typeNode[0].value);
      // Get descriptions of the type
      const typeDesc: string[] = getComments(typeNode[0]).default;
      if (typeDesc.length > 0) {
        result.typeDesc = typeDesc;
      }
    }
    // Processing props's default value
    otherNodes.forEach(node => {
      if (bt.isSpreadElement(node)) {
        return;
      }
      const n = node.key.name;
      if (n === 'default') {
        if (!hasFunctionTypeDef(result.type)) {
          if (bt.isObjectMethod(node)) {
            // Using functionExpression instead of ObjectMethod
            const params = node.params || [];
            let body = node.body;
            if (!bt.isBlockStatement(body)) {
              body = bt.blockStatement(body);
            }
            const r = bt.functionExpression(null, params, body, false, false);
            result.default = runFunction(r);
          } else if (bt.isFunction(node.value)) {
            result.default = runFunction(node.value);
          } else {
            let start = node.value.start || 0;
            let end = node.value.end || 0;
            // if node.value is string literal , e.g: "string literal" need to exclude quote
            if (bt.isStringLiteral(node.value)) {
              start++;
              end--;
            }
            // type sucks, fix it use any...
            result.default = source.slice(start, end) || undefined;
          }
        } else {
          if (bt.isObjectMethod(node)) {
            result.default = generate(node as any).code;
          } else if (bt.isFunction(node.value)) {
            result.default = generate(node.value as any).code;
          }
        }

        // Get descriptions of the default value
        const defaultDesc: string[] = getComments(node).default;
        if (defaultDesc.length > 0) {
          result.defaultDesc = defaultDesc;
        }
      } else if (n === 'required') {
        if (bt.isObjectProperty(node) && bt.isBooleanLiteral(node.value)) {
          result.required = node.value.value;
        }
      } else if (n === 'validator') {
        if (bt.isObjectMethod(node)) {
          result.validator = generate(node as any).code;
        } else {
          result.validator = generate(node.value as any).code;
        }

        // Get descriptions of the validator
        const validatorDesc: string[] = getComments(node).default;
        if (validatorDesc.length > 0) {
          result.validatorDesc = validatorDesc;
        }
      }
    });
  }
}

export function normalizeProps(props: string[]): PropsResult[] {
  return props.map(prop => ({
    type: null,
    name: prop
  }));
}

export function getPropDecorator(
  classPropertyNode: bt.ClassProperty
): bt.Decorator | undefined {
  const decorators = classPropertyNode.decorators;
  if (!decorators) return;

  return decorators.find(
    deco =>
      // @Prop()
      (bt.isCallExpression(deco.expression) &&
        bt.isIdentifier(deco.expression.callee) &&
        ['Prop', 'PropSync'].includes(deco.expression.callee.name)) ||
      // @Prop
      (bt.isIdentifier(deco.expression) &&
        ['Prop', 'PropSync'].includes(deco.expression.name))
  );
}

type PropDecoratorArgument =
  | bt.Identifier
  | bt.ArrayExpression
  | bt.ObjectExpression
  | null;
export function getArgumentFromPropDecorator(decorator: bt.Decorator): {
  propName: string;
  options: PropDecoratorArgument;
} {
  const expression = decorator.expression;
  if (bt.isCallExpression(expression) && bt.isIdentifier(expression.callee)) {
    const calleeName = expression.callee.name;
    if (calleeName === 'Prop') {
      return {
        propName: '',
        options: expression.arguments[0] as PropDecoratorArgument
      };
    } else if (calleeName === 'PropSync') {
      return {
        propName: (expression.arguments[0] as bt.StringLiteral).value,
        options: expression.arguments[1] as PropDecoratorArgument
      };
    }
  }
  return { propName: '', options: null };
}

function getTypeByTypeNode(typeNode: bt.Node): PropType {
  if (bt.isIdentifier(typeNode)) return typeNode.name;
  if (bt.isArrayExpression(typeNode)) {
    if (!typeNode.elements.length) return null;

    return typeNode.elements
      .filter(node => node && bt.isIdentifier(node))
      .map(node => (node as bt.Identifier).name);
  }

  return null;
}

// The `type` of a prop should be an array of constructors or constructors
// eg. String or [String, Number]
function isAllowPropsType(typeNode: bt.Node): boolean {
  return bt.isIdentifier(typeNode) || bt.isArrayExpression(typeNode);
}

function hasFunctionTypeDef(type: PropType): boolean {
  if (typeof type === 'string') {
    return type.toLowerCase() === 'function';
  } else if (Array.isArray(type)) {
    return type.map(a => a.toLowerCase()).some(b => b === 'function');
  }
  return false;
}
