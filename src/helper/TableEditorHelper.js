import { PROPERTIES_SYSTEM, validateElements } from './BasicFormHelper';
import { formatValueBaseOnType } from '../utils/FormatUtils';

export const displayCellValue = (row, column, onFormatCellValue) => {
  const { name: columnName } = column;
  const cellValue = row[columnName];
  if (onFormatCellValue) {
    return onFormatCellValue({ cellName: columnName, cellValue, row, column });
  }

  if (cellValue instanceof Object) {
    const { component } = column;
    return component && component.labelAtt
      ? cellValue[component.labelAtt]
      : cellValue[PROPERTIES_SYSTEM.Label];
  }

  return formatValueBaseOnType({ cellName: columnName, cellValue, row, column, type: column.type });
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
