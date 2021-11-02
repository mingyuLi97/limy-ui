/*
 * @Description: 创建 bem
 * @Author: 李明宇
 * @Date: 2021-10-30 19:06:09
 *
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

export type ModifierType = { [key: string]: any };

export function createBEM(block: string) {
  /**
   * b({ disabled }) // 'button button--disabled'
   */
  return function(
    elOrMod?: string | ModifierType,
    modifiers?: ModifierType
  ): string {
    /**
     * 处理什么都不传
     * b() // 'button'
     */
    if (!elOrMod) return block;

    let el: string;
    let mod: ModifierType;

    if (typeof elOrMod === "string") {
      el = elOrMod;
      mod = modifiers || {};
    } else {
      el = "";
      mod = elOrMod;
    }
    const prefix = el ? `${block}__${el}` : block;
    const modKey = Object.keys(mod);
    return modKey.length === 0
      ? prefix
      : modKey.reduce<string>(
          (res, key) => (res + mod[key] ? ` ${prefix}--${key}` : ""),
          ""
        );
  };
}
