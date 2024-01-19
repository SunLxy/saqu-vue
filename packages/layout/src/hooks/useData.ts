import { provide, inject } from 'vue';

const provideKey = Symbol('GlobaleProvideKey');

export const useGlobaleProvide = () => {
  provide(provideKey, {});
};

export const useData = () => {
  return inject(provideKey, {});
};
