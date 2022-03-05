import { PROPERTIES_SYSTEM } from './FormHelper';
import { isArray, isObject } from '../utils';
import { FieldType } from '../utils/constant';
import { formatDateValue, formatNumberValue } from '../utils/FormatUtils';

export const formatCellValueBaseOnBasicType = ({ cellValue, type }) => {
  if (cellValue != null) {
    switch (type) {
      case FieldType.Date:
        return formatDateValue(cellValue);
      case FieldType.Number:
        return formatNumberValue(cellValue);
      case FieldType.Boolean:
        return cellValue ? 'true' : '';
      default:
        return cellValue;
    }
  }
  return cellValue;
};

export const formatCellValue = ({ cellValue, column }) => {
  const { name: columnName } = column;
  if (isObject(cellValue)) {
    const { component = {} } = column;
    const { labelAttr } = component;
    return labelAttr ? cellValue[labelAttr] : cellValue[PROPERTIES_SYSTEM.Label];
  }

  if (isArray(cellValue)) {
    return cellValue
      .map(item => {
        if (isObject(item)) {
          const { component = {} } = column;
          const { labelAttr } = component;
          return labelAttr ? item[labelAttr] : item[PROPERTIES_SYSTEM.Label];
        }
        return item;
      })
      .filter(item => Boolean(item))
      .join(', ');
  }

  return formatCellValueBaseOnBasicType({ cellName: columnName, cellValue, type: column.type });
};

export const displayCellValue = (row, column, rowIndex, onFormatCellValue) => {
  const { name: columnName } = column;
  const cellValue = row[columnName];

  if (onFormatCellValue) {
    return onFormatCellValue({ cellName: columnName, cellValue, row, column, rowIndex });
  }

  return formatCellValue({ cellValue, row, column, rowIndex });
};
