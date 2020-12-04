import { PROPERTIES_SYSTEM, validateElements } from './BasicFormHelper';
import { formatCellValueBaseOnType } from '../utils/FormatUtils';

export const formatCellValue = ({ cellValue, column }) => {
  const { name: columnName } = column;
  if (cellValue instanceof Object) {
    const { component } = column;
    return component && component.labelAtt
      ? cellValue[component.labelAtt]
      : cellValue[PROPERTIES_SYSTEM.Label];
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

export const validate = (gridData, elements) => {
  let hasError = false;
  const resultErrors = {};
  gridData.forEach((rowData, rowIndex) => {
    const validationResult = validateElements(elements, rowData);
    const { disabled, errors } = validationResult;
    if (!hasError) {
      hasError = disabled;
    }
    if (disabled) {
      resultErrors[rowIndex] = errors;
    }
  });
  return { hasError, errors: resultErrors };
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
