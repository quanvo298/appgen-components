import { PROPERTIES_SYSTEM } from './FormHelper';
import { formatCellValueBaseOnType } from '../utils/FormatUtils';
import { isObject } from '../utils';

export const formatCellValue = ({ cellValue, column }) => {
  const { name: columnName } = column;
  if (isObject(cellValue)) {
    const { component = {} } = column;
    const { labelAttr } = component;
    return labelAttr ? cellValue[labelAttr] : cellValue[PROPERTIES_SYSTEM.Label];
  }

  return formatCellValueBaseOnType({ cellName: columnName, cellValue, type: column.type });
};

export const displayCellValue = (row, column, rowIndex, onFormatCellValue) => {
  const { name: columnName } = column;
  const cellValue = row[columnName];

  if (onFormatCellValue) {
    return onFormatCellValue({ cellName: columnName, cellValue, row, column, rowIndex });
  }

  return formatCellValue({ cellValue, row, column, rowIndex });
};

export const processErrors = (rowRefs, errors) => {
  Object.keys(errors).forEach(rowIndex => {
    const error = errors[rowIndex];
    const rowRef = rowRefs[rowIndex];
    if (rowRef) {
      Object.keys(error).forEach(elementName => {
        if (error[elementName]) {
          rowRef.setError(elementName);
        }
      });
    }
  });
};
