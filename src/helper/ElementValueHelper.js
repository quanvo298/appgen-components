import { isArray, isObject } from '../utils';
import { FieldType } from '../utils/constant';
import { ComponentType } from '../components/ElementFormEditor/ElementFormEditor';
import { convertToOptionItems } from '../mapping/OptionMapping';

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
  return elementValue;
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
      /* case FieldType.Document:
        return processDocumentElementValue({ elementValue, component }); */
      case FieldType.Object:
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
      case FieldType.Object:
        return convertObjectToElementValue({ elementValue });
      default:
        return elementValue;
    }
  }
  return elementValue;
};

export const processComponentData = ({ data = [], type }) => {
  if (type) {
    switch (type) {
      case ComponentType.Select:
      case ComponentType.AutoSelect:
        return convertToOptionItems(data);
      default:
        break;
    }
  }
  return data;
};
