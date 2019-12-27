import { ModeFormType } from 'utils/constant';
import { getItemByName } from 'utils/CollectionUtils';
import { containString } from 'utils/StringUtils';
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
  OvverideUpdatedItemSaved: 'ovverideUpdatedItemSaved',
  OvverideUpdatedItemModified: 'ovverideUpdatedItemModified',
  AfterSaved: 'afterSaved',
};

export const processInitialValues = (elements = [], selectedItem) => {
  const values = {};
  elements.reduce((result, element) => {
    result[element.name] = selectedItem
      ? selectedItem[element.name]
      : element.defaultValue || undefined;
    return result;
  }, values);
  values.id = getEntityId(selectedItem);
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
  const element = getItemByName(name, PROPERTIES_SYSTEM.Name, elements);
  const regExp = element.optProps && element.optProps.regExp;
  return !containString(string, regExp);
};

export const validateElements = (elements, elementsValue, elementFormRefs) => {
  const errors = {};
  const result = {
    disabled: false,
    errors,
  };

  elements.forEach(element => {
    const { name } = element;
    const elementValue = elementsValue[name];

    const elemenentFormRef = elementFormRefs && elementFormRefs[name];
    const elemenentFormValidate = elemenentFormRef && elemenentFormRef[FUNCTION_VALIDATE];
    if (elemenentFormValidate && elemenentFormValidate()) {
      errors[name] = true;
      result.disabled = true;
    }

    if (!errors[name] && validateElement(element, elementValue)) {
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

export const handlePropertyChanged = (composedComponentInstance, name, value, updatedItem) => {
  if (!(name && composedComponentInstance)) {
    return;
  }
  const functionName = createProperyChangedFunctionName(name);
  const beforePropertyChanged =
    composedComponentInstance[FUNCTION_INTEGRATION.BeforePropertyChanged];
  if (beforePropertyChanged) {
    beforePropertyChanged(name, value, updatedItem);
  }

  const propertyChangedFunction = composedComponentInstance[functionName];
  if (propertyChangedFunction) {
    propertyChangedFunction(value, updatedItem);
  }

  const afterPropertyChanged = composedComponentInstance[FUNCTION_INTEGRATION.AfterPropertyChanged];
  if (afterPropertyChanged) {
    afterPropertyChanged({ name, value, updatedItem });
  }
};

export const handleCellChanged = (
  composedComponentInstance,
  propertyName,
  cellName,
  cellValue,
  rowIndexed,
  gridData,
  event
) => {
  if (composedComponentInstance && propertyName && cellName) {
    const functionName = createCellChangedFunctionName(propertyName);
    const cellChanged = composedComponentInstance[functionName];
    if (cellChanged) {
      cellChanged({ propertyName, cellName, cellValue, rowIndexed, gridData, event });
    }
  }
};

export const handleOvverideUpdatedItemSaved = (composedComponentInstance, updatedItem) => {
  if (!(updatedItem && composedComponentInstance)) {
    return updatedItem;
  }

  const ovverideUpdatedItemSaved =
    composedComponentInstance[FUNCTION_INTEGRATION.OvverideUpdatedItemSaved];
  if (ovverideUpdatedItemSaved) {
    return ovverideUpdatedItemSaved(updatedItem);
  }

  return updatedItem;
};

export const handleOvverideUpdatedItemModified = (composedComponentInstance, updatedItem) => {
  if (!(updatedItem && composedComponentInstance)) {
    return updatedItem;
  }

  const ovverideUpdatedItemModified =
    composedComponentInstance[FUNCTION_INTEGRATION.OvverideUpdatedItemModified];
  if (ovverideUpdatedItemModified) {
    return ovverideUpdatedItemModified(updatedItem);
  }

  return updatedItem;
};

export const createProperyValidationFunctionName = name => {
  return `${name}Validation`;
};

export const handleValidatePropertyBeforeSaved = (
  composedComponentInstance,
  validateStrategy,
  element,
  value,
  updatedItem
) => {
  if (element && composedComponentInstance && validateStrategy) {
    const { name } = element;
    const functionName = createProperyValidationFunctionName(name);
    const vaidatePropertyFunction = composedComponentInstance[functionName];
    if (vaidatePropertyFunction) {
      vaidatePropertyFunction(validateStrategy, value, updatedItem);
    }
  }
};

export const handleValidateUpdatedItemBeforeSaved = (
  composedComponentInstance,
  validateStrategy,
  updatedItem
) => {
  if (composedComponentInstance && validateStrategy) {
    const ovverideValidateUpdatedItemBeforeSaved =
      composedComponentInstance[FUNCTION_INTEGRATION.ValidateUpdatedItemBeforeSaved];
    if (ovverideValidateUpdatedItemBeforeSaved) {
      ovverideValidateUpdatedItemBeforeSaved(validateStrategy, updatedItem);
    }
  }
};

export const handleAfterSaved = (composedComponentInstance, updatedItem) => {
  if (!composedComponentInstance) {
    return;
  }
  const afterSaved = composedComponentInstance[FUNCTION_INTEGRATION.AfterSaved];
  if (afterSaved) {
    afterSaved(updatedItem);
  }
};
