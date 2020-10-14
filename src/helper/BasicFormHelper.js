import { ModeFormType } from '../utils/constant';
import { getItemByName } from '../utils/CollectionUtils';
import { containString } from '../utils/StringUtils';
import { validateElement } from './Validator';
import { getEntityId } from './ModelHelper';

export const FUNCTION_VALIDATE = 'validate';

export const PROPERTIES_SYSTEM = {
  Label: 'label',
  Name: 'name',
};

export const FUNCTION_INTEGRATION = {
  BeforePropertyChanged: 'beforePropertyChanged',
  AfterPropertyChanged: 'afterPropertyChanged',
  ValidateUpdatedItemBeforeSaved: 'validateUpdatedItemBeforeSaved',
  UpdatedItemBeforeSaved: 'updatedItemBeforeSaved',
  UpdatedItemBeforeModified: 'updatedItemBeforeModified',
  BeforeSaved: 'onBeforeSaved',
  BeforeModified: 'onBeforeModified',
  AfterSaved: 'onAfterSaved',
};

export const processInitialValues = (elements = [], selectedItem) => {
  const values = {};
  elements.reduce((result, element) => {
    const value = selectedItem ? selectedItem[element.name] : element.defaultValue || null;
    if (value) {
      result[element.name] = value;
    }
    return result;
  }, values);

  const entityId = getEntityId(selectedItem);
  if (entityId) {
    values.id = entityId;
  }
  return values;
};

export const processInitialErrors = (elements = []) => {
  const errors = {};
  elements.reduce((result, element) => {
    result[element.name] = false;
    return result;
  }, errors);
  return errors;
};

export const isUpdatedForm = modeForm => modeForm === ModeFormType.UPDATE;

export const isNewForm = modeForm => !modeForm || modeForm === ModeFormType.NEW;

export const checkElementByRegExp = (elements, name, string) => {
  const element = getItemByName(name, elements, PROPERTIES_SYSTEM.Name);
  const regExp = element.optProps && element.optProps.regExp;
  return !containString(string, regExp);
};

export const validateElements = (elements, elementsValue, formElementsRef = {}) => {
  const errors = {};
  const result = {
    disabled: false,
    errors,
  };

  elements.forEach(element => {
    const { name } = element;
    const elementValue = elementsValue[name];
    const formElementRef = formElementsRef[name];
    const formElementValidate = formElementRef && formElementRef[FUNCTION_VALIDATE];
    if (formElementValidate && !formElementValidate()) {
      errors[name] = true;
      result.disabled = true;
    }

    if (!errors[name] && !validateElement(element, elementValue)) {
      errors[name] = true;
      result.disabled = true;
    }
  });

  return result;
};

export const validatePropertyBeforeSaved = (
  result,
  elements,
  elementsValue,
  externalValidate,
  validateStrategy
) => {
  if (externalValidate) {
    const { errors } = result;
    elements.forEach(element => {
      const { name } = element;
      const elementValue = elementsValue[name];

      externalValidate(validateStrategy, element, elementValue, elementsValue);
      if (validateStrategy.hasError(element.name)) {
        errors[name] = true;
        result.disabled = true;
      }
    });
  }
};

export const processToValidateUpdatedItem = (
  elements,
  updatedItem,
  onValidatePropertyBeforeSaved,
  validateStrategy
) => {
  const validationResult = validateElements(elements, updatedItem);
  validatePropertyBeforeSaved(
    validationResult,
    elements,
    updatedItem,
    onValidatePropertyBeforeSaved,
    validateStrategy
  );
  return validationResult;
};

export const validateUpdatedItemBeforeSaved = (
  result,
  updatedItem,
  externalValidate,
  validateStrategy
) => {
  if (externalValidate) {
    externalValidate(validateStrategy, updatedItem);
    if (validateStrategy.hasErrors()) {
      result.disabled = true;
    }
  }
};

const createProperyChangedFunctionName = name => {
  return `${name}Changed`;
};

const createCellChangedFunctionName = name => {
  return `${name}CellChanged`;
};

const createCellDefinitionFunctionName = name => {
  return `${name}CellDefinition`;
};

export const createProperyValidationFunctionName = name => {
  return `${name}Validation`;
};

export const handlePropertyChanged = (formViewInstance, name, value, updatedItem, event) => {
  if (!(name && formViewInstance)) {
    return;
  }
  const functionName = createProperyChangedFunctionName(name);
  const beforePropertyChanged = formViewInstance[FUNCTION_INTEGRATION.BeforePropertyChanged];
  if (beforePropertyChanged) {
    beforePropertyChanged({ name, value, updatedItem, event });
  }

  const propertyChangedFunction = formViewInstance[functionName];
  if (propertyChangedFunction) {
    propertyChangedFunction(value, updatedItem, event);
  }

  const afterPropertyChanged = formViewInstance[FUNCTION_INTEGRATION.AfterPropertyChanged];
  if (afterPropertyChanged) {
    afterPropertyChanged({ name, value, updatedItem, event });
  }
};

export const handleCellChanged = (
  formViewInstance,
  propertyName,
  cellName,
  cellValue,
  rowIndexed,
  gridData,
  event
) => {
  if (formViewInstance && propertyName && cellName) {
    const functionName = createCellChangedFunctionName(propertyName);
    const cellChanged = formViewInstance[functionName];
    if (cellChanged) {
      cellChanged({ propertyName, cellName, cellValue, rowIndexed, gridData, event });
    }
  }
};

export const handleGetCellDefinition = (formViewInstance, propertyName, cellName, rowIndexed) => {
  if (formViewInstance && propertyName && cellName) {
    const functionName = createCellDefinitionFunctionName(propertyName);
    const cellChanged = formViewInstance[functionName];
    if (cellChanged) {
      return cellChanged({ propertyName, cellName, rowIndexed });
    }
  }
  return {};
};

export const handleBeforeSaved = (formViewInstance, updatedItem) => {
  if (!(updatedItem && formViewInstance)) {
    return updatedItem;
  }

  let beforeSaved = formViewInstance[FUNCTION_INTEGRATION.UpdatedItemBeforeSaved];
  if (beforeSaved) {
    return beforeSaved(updatedItem);
  }

  beforeSaved = formViewInstance[FUNCTION_INTEGRATION.BeforeSaved];
  if (beforeSaved) {
    return beforeSaved(updatedItem);
  }

  return updatedItem;
};

export const handleBeforeModified = (formViewInstance, updatedItem) => {
  if (!(updatedItem && formViewInstance)) {
    return updatedItem;
  }

  let beforeModified = formViewInstance[FUNCTION_INTEGRATION.UpdatedItemBeforeModified];
  if (beforeModified) {
    return beforeModified(updatedItem);
  }

  beforeModified = formViewInstance[FUNCTION_INTEGRATION.BeforeModified];
  if (beforeModified) {
    return beforeModified(updatedItem);
  }

  return handleBeforeSaved(formViewInstance, updatedItem);
};

export const handleValidatePropertyBeforeSaved = (
  formViewInstance,
  validateStrategy,
  element,
  value,
  updatedItem
) => {
  if (element && formViewInstance && validateStrategy) {
    const { name } = element;
    const functionName = createProperyValidationFunctionName(name);
    const vaidatePropertyFunction = formViewInstance[functionName];
    if (vaidatePropertyFunction) {
      vaidatePropertyFunction(validateStrategy, value, updatedItem);
    }
  }
};

export const handleValidateUpdatedItemBeforeSaved = (
  formViewInstance,
  validateStrategy,
  updatedItem
) => {
  if (formViewInstance && validateStrategy) {
    const validateUpdatedItemBeforeSavedExt =
      formViewInstance[FUNCTION_INTEGRATION.ValidateUpdatedItemBeforeSaved];
    if (validateUpdatedItemBeforeSavedExt) {
      validateUpdatedItemBeforeSavedExt(validateStrategy, updatedItem);
    }
  }
};

export const handleAfterSaved = (formViewInstance, updatedItem) => {
  if (!formViewInstance) {
    return;
  }
  const afterSaved = formViewInstance[FUNCTION_INTEGRATION.AfterSaved];
  if (afterSaved) {
    afterSaved(updatedItem);
  }
};
