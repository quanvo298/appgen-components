import { formatDateShort, parseDate } from './DateUtils';
import { getCurrentLocale } from './LocalProvider';
import { PropertyDataType } from './constant';
import { isNumber, isString } from './StringUtils';

export const formatCellDateValue = date => {
  if (date && isNumber(date)) {
    return formatDateShort(new Date(date));
  }

  if (date && isString(date)) {
    return formatDateShort(parseDate(date));
  }
  return date;
};

export const formatCellNumberValue = numberValue => {
  if (numberValue) {
    return new Intl.NumberFormat(getCurrentLocale(), {}).format(numberValue);
  }
  return numberValue;
};

export const isDatePropertyType = type => type === PropertyDataType.Date;

export const isNumberPropertyType = type => type === PropertyDataType.Number;

export const isObjectPropertyType = type => type === PropertyDataType.Object;

export const formatValueBaseOnType = ({ cellValue, type }) => {
  if (!cellValue) {
    return cellValue;
  }

  if (isDatePropertyType(type)) {
    return formatCellDateValue(cellValue);
  }

  if (isNumberPropertyType(type)) {
    return formatCellNumberValue(cellValue);
  }

  return cellValue;
};
