import cloneDeep from 'lodash/cloneDeep';

export const cloneObjectDeep = object => cloneDeep(object);

export const isNumber = str => typeof str === 'number';

export const isString = str => typeof str === 'string';

export const isArray = str => str instanceof Array;

export const isObject = str => Boolean(str) && typeof str === 'object' && !isArray(str);

export const isFunc = str => typeof str === 'function';
