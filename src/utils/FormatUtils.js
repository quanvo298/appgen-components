import { formatDateShort, parseDate } from './DateUtils';
import { getCurrentLocale } from './LocaleProvider';
import { FieldType } from './constant';
import { isNumber, isString } from './ObjectUtils';

export const formatNumberValue = numberValue => {
  if (numberValue) {
    return new Intl.NumberFormat(getCurrentLocale(), {}).format(numberValue);
  }
  return numberValue;
};

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
  return formatNumberValue(numberValue);
};

export const isDatePropertyType = type => type === FieldType.Date;

export const formatCellValueBaseOnType = ({ cellValue, type }) => {
  if (cellValue) {
    switch (type) {
      case FieldType.Date:
        return formatCellDateValue(cellValue);
      case FieldType.Number:
        return formatCellNumberValue(cellValue);
      default:
        return cellValue;
    }
  }
  return cellValue;
};
