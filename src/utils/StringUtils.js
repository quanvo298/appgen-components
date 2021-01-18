export const isBlank = str => !(str && str.trim && str.trim().length > 0);

export const isNotBlank = str => !isBlank(str);

export const removeAllWhiteSpace = str => str.replace(/\s/g, '');

export const upperFirstChar = strValue => {
  return strValue.charAt(0).toUpperCase() + strValue.slice(1);
};

export const containString = (stringValue, regExp) => {
  if (regExp instanceof RegExp) {
    const condition = new RegExp(regExp, 'g');
    const result = condition.test(stringValue);
    return result;
  }

  if (regExp instanceof Object) {
    const conditions = regExp.map(rule => new RegExp(rule, 'g'));
    const result = conditions.find(condition => condition.test(stringValue));
    return result;
  }

  if (regExp) {
    const condition = new RegExp(regExp, 'g');
    const result = condition.test(stringValue);
    return result;
  }
  return true;
};
