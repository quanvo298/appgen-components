import { isArray, isObject } from '../utils';
import { PropertyDataType } from '../utils/constant';

export const convertObjectToElementValue = ({ elementValue }) => {
  if (isArray(elementValue)) {
    return elementValue;
  }

  return [
    Object.keys(elementValue).reduce((acc, cur) => {
      acc.name = cur;
      acc.value = elementValue[cur];
      return acc;
    }, {}),
  ];
};

export const processDocumentElementValue = ({ elementValue, component = { data: [] } }) => {
  if (!isObject(elementValue)) {
    return component.data.find(comp => comp.value === elementValue);
  }
  return null;
};

export const processObjectElementValue = ({ elementValue, component }) => {
  const objectValue = elementValue || (component && component.data);
  if (isArray(objectValue) && objectValue.length) {
    return objectValue.reduce((acc, cur) => {
      const { name, value } = cur;
      acc[name] = value;
      return acc;
    }, {});
  }
  if (isObject(objectValue)) {
    const result = convertObjectToElementValue({ elementValue: objectValue });
    return result;
  }
  return null;
};

export const processElementValue = ({ elementValue, type, component = { data: [] } }) => {
  if (type) {
    switch (type) {
      case PropertyDataType.Document:
        return processDocumentElementValue({ elementValue, component });
      case PropertyDataType.Object:
        return processObjectElementValue({ elementValue, component });
      default:
        return elementValue;
    }
  }
  return elementValue;
};

export const convertToElementValue = ({ elementValue, type }) => {
  if (elementValue && type) {
    switch (type) {
      case PropertyDataType.Object:
        return convertObjectToElementValue({ elementValue });
      default:
        return elementValue;
    }
  }
  return elementValue;
};
