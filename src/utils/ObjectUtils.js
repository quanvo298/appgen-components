import cloneDeep from 'lodash/cloneDeep';

export const cloneObjectDeep = object => cloneDeep(object);

export const isNumber = str => typeof str === 'number';

export const isString = str => typeof str === 'string';

export const isObject = str => typeof str === 'object';

export const isFunc = str => typeof str === 'function';

export const isArray = str => str instanceof Array;

export const assignToRef = (ref, item) => {
  if (ref && Object.getOwnPropertyNames(ref).includes('current')) {
    ref.current = item;
  } else if (ref && isFunc(ref)) {
    ref(item);
  }
};
