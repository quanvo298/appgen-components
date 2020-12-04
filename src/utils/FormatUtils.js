import { formatDateShort, parseDate } from './DateUtils';
import { getCurrentLocale } from './LocaleProvider';
import { PropertyDataType } from './constant';
import { isNumber, isString } from './ObjectUtils';

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

export const formatCellValueBaseOnType = ({ value, type }) => {
  if (value) {
    switch (type) {
      case PropertyDataType.Date:
        return formatCellDateValue(value);
      case PropertyDataType.Number:
        return formatCellNumberValue(value);
      default:
        return value;
    }
  }
  return value;
};
