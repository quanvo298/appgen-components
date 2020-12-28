import { useEffect, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import PubSub, { SUBSCRIPTION } from '../utils/PubSub';
import {
  isUpdatedForm,
  isNewForm,
  validateElements,
  validatePropertyBeforeSaved,
  validateUpdatedItemBeforeSaved,
  processInitialValues,
  reduceSelectedItem,
} from '../helper/BasicFormHelper';

import { ModeFormType, NotificationKind } from '../utils/constant';
import { createValidatorStrategy } from '../helper/Validator';
import { defaultFunc } from '../utils/props';
import { useBasicFormCtx } from '../components/BasicForm/BasicFormProvider';
import { usePolyglot } from '../utils';
import useGetSetRef from './useGetSetRef';
import { isUpdated } from '../helper/ModelHelper';

const getModelForm = selectedItem =>
  isUpdated(selectedItem) ? ModeFormType.UPDATE : ModeFormType.NEW;

const useBasicForm = ({
  selectedItem: propSelectedItem,
  elements = [],
  onUpdate = defaultFunc,
  onSave = defaultFunc,
}) => {
  const polyglot = usePolyglot();
  const basicFormContext = useBasicFormCtx();
  const { formConfig = {} } = basicFormContext;
  const {
    onPropertyChange = defaultFunc,
    onValidatePropertyBeforeSaved,
    onValidateUpdatedItemBeforeSaved,
    onBeforeSaved,
    onBeforeModified,
    onAfterSaved = defaultFunc,
  } = formConfig;

  const [modeForm, setModeForm] = useState(getModelForm(propSelectedItem));
  const {
    get: getFormElements,
    setProp: setFormElement,
    clearProps: clearFormElements,
  } = useGetSetRef({});
  const { get: getValues, set: setValues, setProp: setValue } = useGetSetRef({});

  if (Object.keys(getFormElements()).length) {
    clearFormElements();
  }

  const getFormElement = propName => getFormElements()[propName];
  const addFormElementRef = (formElementRef = {}) => {
    const { name } = formElementRef;
    if (name) {
      setFormElement(name, formElementRef);
    }
  };

  const reset = () => {
    const selectedItem = reduceSelectedItem(basicFormContext.getFormView(), propSelectedItem);
    const initial = cloneDeep(processInitialValues(elements, selectedItem));
    setValues(initial);
    const formElements = getFormElements();
    Object.keys(formElements).forEach(elementName => {
      formElements[elementName].setFieldValue(initial[elementName]);
      formElements[elementName].setFieldError(false);
    });
  };

  useEffect(() => {
    if (!(isUpdated(propSelectedItem) && modeForm === ModeFormType.UPDATE)) {
      setModeForm(getModelForm(propSelectedItem));
    }
    reset();
  }, [propSelectedItem]);

  const onChange = (name, value) => event => {
    setValue(name, value);
    onPropertyChange({ name, value, updatedItem: getValues(), event });
  };

  const processErrors = errors => {
    const formElements = getFormElements();
    Object.keys(formElements).forEach(elementName => {
      formElements[elementName].setFieldError(errors[elementName]);
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
      const selectedItem = reduceSelectedItem(basicFormContext.getFormView(), propSelectedItem);
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

  const validateAndGetUpdateItem = () => {
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
    const updatedItem = validateAndGetUpdateItem();
    if (updatedItem) {
      saveOrUpdate(updatedItem);
    }
  };

  basicFormContext.setFormWidget({
    validateAndGetUpdateItem,
    getFormElement,
    getFormElements,
    getValues,
  });

  return {
    addFormElementRef,
    getValues,
    reset,
    save,
    validateAndGetUpdateItem,
    onChange,
    modeForm,
  };
};

export default useBasicForm;
