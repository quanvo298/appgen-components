"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processErrors = exports.validate = exports.displayCellValue = void 0;

var _BasicFormHelper = require("./BasicFormHelper");

var displayCellValue = function displayCellValue(row, column, onFormatCellValue) {
  var columnName = column.name;
  var cellValue = row[columnName];

  if (onFormatCellValue) {
    return onFormatCellValue({
      cellName: columnName,
      cellValue: cellValue,
      row: row,
      column: column
    });
  }

  if (cellValue instanceof Object) {
    var component = column.component;
    return component && component.labelAtt ? cellValue[component.labelAtt] : cellValue[_BasicFormHelper.PROPERTIES_SYSTEM.Label];
  }

  return cellValue;
};

exports.displayCellValue = displayCellValue;

var validate = function validate(gridData, elements) {
  var hasError = false;
  var resultErrors = {};
  gridData.forEach(function (rowData, rowIndex) {
    var validationResult = (0, _BasicFormHelper.validateElements)(elements, rowData);
    var disabled = validationResult.disabled,
        errors = validationResult.errors;

    if (!hasError) {
      hasError = disabled;
    }

    if (disabled) {
      resultErrors[rowIndex] = errors;
    }
  });
  return {
    hasError: hasError,
    errors: resultErrors
  };
};

exports.validate = validate;

var processErrors = function processErrors(rowRefs, errors) {
  Object.keys(errors).forEach(function (rowIndex) {
    var error = errors[rowIndex];
    var rowRef = rowRefs[rowIndex];

    if (rowRef) {
      Object.keys(error).forEach(function (elementName) {
        if (error[elementName]) {
          rowRef.setError(elementName);
        }
      });
    }
  });
};

exports.processErrors = processErrors;