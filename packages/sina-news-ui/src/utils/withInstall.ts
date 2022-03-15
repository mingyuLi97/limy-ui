import Vue, { VueConstructor } from 'vue';

export type WithInstall<T> = T & {
  install(app: VueConstructor<Vue>): void;
};

export function withInstall<T extends VueConstructor<Vue>>(component: T) {
  // @ts-ignore
  component.install = (Vue: VueConstructor<Vue>) => {
    Vue.component(`sn${component.name}`, component);
  };
  return component as WithInstall<T>;
}
