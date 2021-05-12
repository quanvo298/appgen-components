import { formatDateShort, parseDate } from './DateUtils';
import { getCurrentLocale } from './LocaleProvider';
import { FieldType } from './constant';
import { isArray, isNumber, isObject, isString } from './ObjectUtils';

export const formatNumberValue = numberValue => {
  if (numberValue) {
    return new Intl.NumberFormat(getCurrentLocale(), {}).format(numberValue);
  }
  return numberValue;
};

export const formatDateValue = date => {
  if (date && isNumber(date)) {
    return formatDateShort(new Date(date));
  }

  if (date && isString(date)) {
    return formatDateShort(parseDate(date));
  }
  return date;
};

export const formatFieldValueBaseOnType = ({ value, type, multiple, component }) => {
  if (value != null) {
    const { data: propComponentData = [], valueAttr = 'value', labelAttr = 'label' } =
      component || {};
    let found;
    switch (type) {
      case FieldType.Boolean:
        return Boolean(value);
      case FieldType.Number:
        return Number(value);
      case FieldType.Object:
        if (multiple) {
          return propComponentData
            .filter(dataItem => {
              const itemValue = dataItem && dataItem[valueAttr];
              if (itemValue) {
                return isArray(value) ? value.includes(itemValue) : itemValue === value;
              }
              return false;
            })
            .map(dataItem => ({
              [valueAttr]: dataItem[valueAttr],
              [labelAttr]: dataItem[labelAttr],
            }));
        }
        found = propComponentData.find(dataItem => dataItem && dataItem[valueAttr] === value);
        return found ? { [valueAttr]: found[valueAttr], [labelAttr]: found[labelAttr] } : null;

      default:
        return value;
    }
  }
  return value;
};

export const convertToEditorValueBaseOnType = ({
  value,
  type,
  component: { valueAttr = 'value' },
}) => {
  if (value) {
    switch (type) {
      case FieldType.Object:
        if (isObject(value)) {
          return value[valueAttr];
        }
        return value;
      default:
        return value;
    }
  }
  return value;
};
