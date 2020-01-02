"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleAfterSaved = exports.handleValidateUpdatedItemBeforeSaved = exports.handleValidatePropertyBeforeSaved = exports.createProperyValidationFunctionName = exports.handleOvverideUpdatedItemModified = exports.handleOvverideUpdatedItemSaved = exports.handleCellChanged = exports.handlePropertyChanged = exports.validateUpdatedItemBeforeSaved = exports.processToValidateUpdatedItem = exports.validatePropertyBeforeSaved = exports.validateElements = exports.checkElementByRegExp = exports.isNewForm = exports.isUpdatedForm = exports.processInitialErrors = exports.processInitialValues = exports.FUNCTION_INTEGRATION = exports.PROPERTIES_SYSTEM = exports.FUNCTION_VALIDATE = void 0;

var _constant = require("../utils/constant");

var _CollectionUtils = require("../utils/CollectionUtils");

var _StringUtils = require("../utils/StringUtils");

var _Validator = require("./Validator");

var _ModelHelper = require("./ModelHelper");

var FUNCTION_VALIDATE = 'validate';
exports.FUNCTION_VALIDATE = FUNCTION_VALIDATE;
var PROPERTIES_SYSTEM = {
  Label: 'label',
  Name: 'name'
};
exports.PROPERTIES_SYSTEM = PROPERTIES_SYSTEM;
var FUNCTION_INTEGRATION = {
  BeforePropertyChanged: 'beforePropertyChanged',
  AfterPropertyChanged: 'afterPropertyChanged',
  ValidateUpdatedItemBeforeSaved: 'validateUpdatedItemBeforeSaved',
  OvverideUpdatedItemSaved: 'ovverideUpdatedItemSaved',
  OvverideUpdatedItemModified: 'ovverideUpdatedItemModified',
  AfterSaved: 'afterSaved'
};
exports.FUNCTION_INTEGRATION = FUNCTION_INTEGRATION;

var processInitialValues = function processInitialValues() {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var selectedItem = arguments.length > 1 ? arguments[1] : undefined;
  var values = {};
  elements.reduce(function (result, element) {
    result[element.name] = selectedItem ? selectedItem[element.name] : element.defaultValue || undefined;
    return result;
  }, values);
  values.id = (0, _ModelHelper.getEntityId)(selectedItem);
  return values;
};

exports.processInitialValues = processInitialValues;

var processInitialErrors = function processInitialErrors() {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var errors = {};
  elements.reduce(function (result, element) {
    result[element.name] = false;
    return result;
  }, errors);
  return errors;
};

exports.processInitialErrors = processInitialErrors;

var isUpdatedForm = function isUpdatedForm(modeForm) {
  return modeForm === _constant.ModeFormType.UPDATE;
};

exports.isUpdatedForm = isUpdatedForm;

var isNewForm = function isNewForm(modeForm) {
  return !modeForm || modeForm === _constant.ModeFormType.NEW;
};

exports.isNewForm = isNewForm;

var checkElementByRegExp = function checkElementByRegExp(elements, name, string) {
  var element = (0, _CollectionUtils.getItemByName)(name, PROPERTIES_SYSTEM.Name, elements);
  var regExp = element.optProps && element.optProps.regExp;
  return !(0, _StringUtils.containString)(string, regExp);
};

exports.checkElementByRegExp = checkElementByRegExp;

var validateElements = function validateElements(elements, elementsValue, elementFormRefs) {
  var errors = {};
  var result = {
    disabled: false,
    errors: errors
  };
  elements.forEach(function (element) {
    var name = element.name;
    var elementValue = elementsValue[name];
    var elemenentFormRef = elementFormRefs && elementFormRefs[name];
    var elemenentFormValidate = elemenentFormRef && elemenentFormRef[FUNCTION_VALIDATE];

    if (elemenentFormValidate && elemenentFormValidate()) {
      errors[name] = true;
      result.disabled = true;
    }

    if (!errors[name] && (0, _Validator.validateElement)(element, elementValue)) {
      errors[name] = true;
      result.disabled = true;
    }
  });
  return result;
};

exports.validateElements = validateElements;

var validatePropertyBeforeSaved = function validatePropertyBeforeSaved(result, elements, elementsValue, externalValidate, validateStrategy) {
  if (externalValidate) {
    var errors = result.errors;
    elements.forEach(function (element) {
      var name = element.name;
      var elementValue = elementsValue[name];
      externalValidate(validateStrategy, element, elementValue, elementsValue);

      if (validateStrategy.hasError(element.name)) {
        errors[name] = true;
        result.disabled = true;
      }
    });
  }
};

exports.validatePropertyBeforeSaved = validatePropertyBeforeSaved;

var processToValidateUpdatedItem = function processToValidateUpdatedItem(elements, updatedItem, onValidatePropertyBeforeSaved, validateStrategy) {
  var validationResult = validateElements(elements, updatedItem);
  validatePropertyBeforeSaved(validationResult, elements, updatedItem, onValidatePropertyBeforeSaved, validateStrategy);
  return validationResult;
};

exports.processToValidateUpdatedItem = processToValidateUpdatedItem;

var validateUpdatedItemBeforeSaved = function validateUpdatedItemBeforeSaved(result, updatedItem, externalValidate, validateStrategy) {
  if (externalValidate) {
    externalValidate(validateStrategy, updatedItem);

    if (validateStrategy.hasErrors()) {
      result.disabled = true;
    }
  }
};

exports.validateUpdatedItemBeforeSaved = validateUpdatedItemBeforeSaved;

var createProperyChangedFunctionName = function createProperyChangedFunctionName(name) {
  return "".concat(name, "Changed");
};

var createCellChangedFunctionName = function createCellChangedFunctionName(name) {
  return "".concat(name, "CellChanged");
};

var handlePropertyChanged = function handlePropertyChanged(composedComponentInstance, name, value, updatedItem) {
  if (!(name && composedComponentInstance)) {
    return;
  }

  var functionName = createProperyChangedFunctionName(name);
  var beforePropertyChanged = composedComponentInstance[FUNCTION_INTEGRATION.BeforePropertyChanged];

  if (beforePropertyChanged) {
    beforePropertyChanged(name, value, updatedItem);
  }

  var propertyChangedFunction = composedComponentInstance[functionName];

  if (propertyChangedFunction) {
    propertyChangedFunction(value, updatedItem);
  }

  var afterPropertyChanged = composedComponentInstance[FUNCTION_INTEGRATION.AfterPropertyChanged];

  if (afterPropertyChanged) {
    afterPropertyChanged({
      name: name,
      value: value,
      updatedItem: updatedItem
    });
  }
};

exports.handlePropertyChanged = handlePropertyChanged;

var handleCellChanged = function handleCellChanged(composedComponentInstance, propertyName, cellName, cellValue, rowIndexed, gridData, event) {
  if (composedComponentInstance && propertyName && cellName) {
    var functionName = createCellChangedFunctionName(propertyName);
    var cellChanged = composedComponentInstance[functionName];

    if (cellChanged) {
      cellChanged({
        propertyName: propertyName,
        cellName: cellName,
        cellValue: cellValue,
        rowIndexed: rowIndexed,
        gridData: gridData,
        event: event
      });
    }
  }
};

exports.handleCellChanged = handleCellChanged;

var handleOvverideUpdatedItemSaved = function handleOvverideUpdatedItemSaved(composedComponentInstance, updatedItem) {
  if (!(updatedItem && composedComponentInstance)) {
    return updatedItem;
  }

  var ovverideUpdatedItemSaved = composedComponentInstance[FUNCTION_INTEGRATION.OvverideUpdatedItemSaved];

  if (ovverideUpdatedItemSaved) {
    return ovverideUpdatedItemSaved(updatedItem);
  }

  return updatedItem;
};

exports.handleOvverideUpdatedItemSaved = handleOvverideUpdatedItemSaved;

var handleOvverideUpdatedItemModified = function handleOvverideUpdatedItemModified(composedComponentInstance, updatedItem) {
  if (!(updatedItem && composedComponentInstance)) {
    return updatedItem;
  }

  var ovverideUpdatedItemModified = composedComponentInstance[FUNCTION_INTEGRATION.OvverideUpdatedItemModified];

  if (ovverideUpdatedItemModified) {
    return ovverideUpdatedItemModified(updatedItem);
  }

  return updatedItem;
};

exports.handleOvverideUpdatedItemModified = handleOvverideUpdatedItemModified;

var createProperyValidationFunctionName = function createProperyValidationFunctionName(name) {
  return "".concat(name, "Validation");
};

exports.createProperyValidationFunctionName = createProperyValidationFunctionName;

var handleValidatePropertyBeforeSaved = function handleValidatePropertyBeforeSaved(composedComponentInstance, validateStrategy, element, value, updatedItem) {
  if (element && composedComponentInstance && validateStrategy) {
    var name = element.name;
    var functionName = createProperyValidationFunctionName(name);
    var vaidatePropertyFunction = composedComponentInstance[functionName];

    if (vaidatePropertyFunction) {
      vaidatePropertyFunction(validateStrategy, value, updatedItem);
    }
  }
};

exports.handleValidatePropertyBeforeSaved = handleValidatePropertyBeforeSaved;

var handleValidateUpdatedItemBeforeSaved = function handleValidateUpdatedItemBeforeSaved(composedComponentInstance, validateStrategy, updatedItem) {
  if (composedComponentInstance && validateStrategy) {
    var ovverideValidateUpdatedItemBeforeSaved = composedComponentInstance[FUNCTION_INTEGRATION.ValidateUpdatedItemBeforeSaved];

    if (ovverideValidateUpdatedItemBeforeSaved) {
      ovverideValidateUpdatedItemBeforeSaved(validateStrategy, updatedItem);
    }
  }
};

exports.handleValidateUpdatedItemBeforeSaved = handleValidateUpdatedItemBeforeSaved;

var handleAfterSaved = function handleAfterSaved(composedComponentInstance, updatedItem) {
  if (!composedComponentInstance) {
    return;
  }

  var afterSaved = composedComponentInstance[FUNCTION_INTEGRATION.AfterSaved];

  if (afterSaved) {
    afterSaved(updatedItem);
  }
};

exports.handleAfterSaved = handleAfterSaved;