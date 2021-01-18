import { useState } from 'react';

import cloneDeep from 'lodash/cloneDeep';
import { ModeFormType, NotificationKind } from '../../../utils/constant';
import { isUpdated } from '../../../helper/ModelHelper';
import { useFormCtx } from './FormProvider';
import {
  reduceSelectedItem,
  processInitialValues,
  validateFields,
  reduceModifiedItem,
  validateBeforeSave,
  isUpdatedForm,
  isNewForm,
} from '../../../helper/FormHelper';
import { createValidatorStrategy } from '../../../helper/Validator';
import { usePolyglot } from '../../../utils';
import PubSub, { SUBSCRIPTION } from '../../../utils/PubSub';
import { defaultFunc } from '../../../utils/props';

const getModelForm = selectedItem =>
  isUpdated(selectedItem) ? ModeFormType.UPDATE : ModeFormType.NEW;

const useForm = ({ selectedItem, onUpdate = defaultFunc, onSave = defaultFunc }) => {
  const {
    getFormConfig,
    setFormConfig,
    getFormIntegrations,
    setFormValues,
    getFormValues,
    getFieldErrors,
    setFieldErrors,
    emitEvent,
    onFieldChange: fieldChange,
  } = useFormCtx();

  const { reduceFormConfig } = getFormIntegrations();
  if (reduceFormConfig != null) {
    const formConfig = reduceFormConfig(getFormConfig());
    setFormConfig(formConfig);
  }

  const modeForm = getModelForm(selectedItem);
  const [, resetFormValues] = useState(null);
  const polyglot = usePolyglot();

  const initializeFormValues = () => {
    const formValues = getFormValues();
    if (formValues) {
      return formValues;
    }
    const { fields } = getFormConfig();
    const { reduceSelectedItem: callbackReduceSelectedItem } = getFormIntegrations();
    const item = reduceSelectedItem({ selectedItem })(callbackReduceSelectedItem);
    const initial = cloneDeep(processInitialValues({ fields, item }));
    setFormValues(initial);
    return initial;
  };

  const resetForm = () => {
    setFormValues(null);
    const newFormValues = initializeFormValues();
    setFieldErrors({});
    resetFormValues(newFormValues);
  };

  const onFieldChange = (name, value) => event => {
    fieldChange({ name, value, event });
  };

  const showErrorMessage = validateStrategy => {
    PubSub.publish(
      { message: validateStrategy.getErrors(), kind: NotificationKind.Error },
      SUBSCRIPTION.Notification
    );
  };

  const attemptToValidateAndGetModifiedItem = () => {
    const { fields } = getFormConfig();
    const formValues = getFormValues();
    const validationResult = validateFields({ fields, formValues, emitEvent });
    const { disabled, errors } = validationResult;
    const validateStrategy = createValidatorStrategy({ errors, polyglot });

    if (disabled) {
      setFieldErrors(errors);
      resetFormValues({ ...formValues });
      if (validateStrategy.hasErrors()) {
        showErrorMessage(validateStrategy);
      }
      return false;
    }

    const {
      reduceModifiedItem: callbackReduceSelectedItem,
      validateBeforeSave: callbackValidateBeforeSave,
    } = getFormIntegrations();
    const modifiedItem = reduceModifiedItem({ modifiedItem: formValues })(
      callbackReduceSelectedItem
    );

    validateBeforeSave({ modifiedItem, validateStrategy, validationResult })(
      callbackValidateBeforeSave
    );

    if (validationResult.disabled && validateStrategy.hasErrors()) {
      showErrorMessage(validateStrategy);
      return false;
    }

    return modifiedItem;
  };

  const saveOrUpdate = modifiedItem => {
    if (isUpdatedForm(modeForm)) {
      onUpdate(modifiedItem);
    } else if (isNewForm(modeForm)) {
      onSave(modifiedItem);
    }
  };

  const save = () => {
    const updatedItem = attemptToValidateAndGetModifiedItem();
    if (updatedItem) {
      saveOrUpdate(updatedItem);
    }
  };

  initializeFormValues();

  return {
    modeForm,
    getFormValues,
    getFieldErrors,
    save,
    reset: resetForm,
    onFieldChange,
  };
};

export default useForm;
