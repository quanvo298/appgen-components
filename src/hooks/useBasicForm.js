import { useRef, useState, useEffect } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import PubSub, { SUBSCRIPTION } from '../utils/PubSub';
import {
  isUpdatedForm,
  isNewForm,
  validateElements,
  validatePropertyBeforeSaved,
  validateUpdatedItemBeforeSaved,
  processInitialValues,
} from '../helper/BasicFormHelper';

import { NotificationKind } from '../utils/constant';
import { createValidatorStrategy } from '../helper/Validator';
import { defaultFunc } from '../utils/props';

const useBasicForm = ({
  modeForm,
  elements = [],
  selectedItem,
  onPropertyChange = defaultFunc,
  onAfterPropertiesChanged,
  onValidatePropertyBeforeSaved,
  onValidateUpdatedItemBeforeSaved,
  onBeforeSaved,
  onBeforeModified,
  onUpdate = defaultFunc,
  onSave = defaultFunc,
  onAfterSaved = defaultFunc,
  polyglot,
}) => {
  const formElementsRef = useRef({});
  const valuesRef = useRef({});
  const [, setInitialValues] = useState(null);

  const getFormElements = () => formElementsRef.current;

  const getFormElement = propName => getFormElements()[propName];

  const addFormElement = (propName, formElementRef) => {
    formElementsRef.current[propName] = formElementRef;
  };

  const addFormElementRef = formElementRef => {
    if (formElementRef) {
      const { props = {} } = formElementRef;
      const { name } = props;
      if (name) {
        addFormElement(name, formElementRef);
      }
    }
  };

  const getValues = () => valuesRef.current;

  const setValues = values => {
    valuesRef.current = values;
  };

  const setValue = (name, value) => {
    valuesRef.current[name] = value;
  };

  const reset = () => {
    const initial = cloneDeep(processInitialValues(elements, selectedItem));
    setValues(initial);
    setInitialValues(initial);
  };

  useEffect(() => {
    reset();
  }, [selectedItem]);

  const onChange = (name, value) => event => {
    setValue(name, value);
    onPropertyChange(name, value, getValues())(event);
    if (onAfterPropertiesChanged) {
      onAfterPropertiesChanged({ name, value, updateItem: cloneDeep(getValues) });
    }
  };

  const processErrors = errors => {
    const formElements = getFormElements();
    Object.keys(formElements).forEach(elementName => {
      formElements[elementName].setError(errors[elementName]);
    });
  };

  const processUpdatedItemBeforeSaved = updatedItem =>
    onBeforeSaved ? onBeforeSaved(updatedItem) : updatedItem;

  const processUpdatedItemBeforeModified = updatedItem =>
    onBeforeModified ? onBeforeModified(updatedItem) : updatedItem;

  const processAfterSaved = updatedItem => {
    onAfterSaved(updatedItem);
  };

  const processUpdatedItem = () => {
    const values = getValues();
    if (isUpdatedForm(modeForm)) {
      const updatedItem = { ...selectedItem, ...values };
      return processUpdatedItemBeforeModified(updatedItem);
    }
    if (isNewForm(modeForm)) {
      return processUpdatedItemBeforeSaved(values);
    }
    return values;
  };

  const showErrorMessage = validateStrategy => {
    PubSub.publish(
      { message: validateStrategy.getErrors(), kind: NotificationKind.Error },
      SUBSCRIPTION.Notification
    );
  };

  const getUpdateItemAndValidate = () => {
    const values = getValues();
    const validationResult = validateElements(elements, values, getFormElements());
    const validateStrategy = createValidatorStrategy(polyglot);

    validatePropertyBeforeSaved(
      validationResult,
      elements,
      values,
      onValidatePropertyBeforeSaved,
      validateStrategy
    );
    const { disabled, errors } = validationResult;

    if (disabled) {
      processErrors(errors);

      if (validateStrategy.hasErrors()) {
        showErrorMessage(validateStrategy);
      }
      return false;
    }

    const updatedItem = processUpdatedItem();
    validateUpdatedItemBeforeSaved(
      validationResult,
      updatedItem,
      onValidateUpdatedItemBeforeSaved,
      validateStrategy
    );

    if (validationResult.disabled && validateStrategy.hasErrors()) {
      showErrorMessage(validateStrategy);
      return false;
    }
    return updatedItem;
  };

  const saveOrUpdate = updatedItem => {
    if (isUpdatedForm(modeForm)) {
      onUpdate(updatedItem);
      processAfterSaved(updatedItem);
    } else if (isNewForm(modeForm)) {
      onSave(updatedItem);
      processAfterSaved(updatedItem);
    }
  };

  const save = () => {
    const updatedItem = getUpdateItemAndValidate();
    if (updatedItem) {
      saveOrUpdate(updatedItem);
    }
  };

  const assignToRef = ref => {
    if (ref) {
      ref.current = {
        ...ref.current,
        getFormElement,
        getFormElements,
        getValues,
        getUpdateItemAndValidate,
      };
    }
  };

  return {
    assignToRef,
    addFormElementRef,
    getValues,
    reset,
    save,
    getUpdateItemAndValidate,
    onChange,
  };
};

export default useBasicForm;
