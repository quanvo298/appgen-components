import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { NotificationKind } from '../../../utils/constant';
import { defaultFunc } from '../../../utils/props';
import { usePolyglot } from '../../../utils';
import {
  createFieldChanged,
  createFieldEventChanged,
  FIELD_CHANGED,
  fieldChanged,
  reduceModifiedItem,
  validateBeforeSave,
  validateFields,
} from '../../../helper/FormHelper';
import PubSub, { SUBSCRIPTION } from '../../../utils/PubSub';
import { createValidatorStrategy } from '../../../helper/Validator';
import { useForm } from '../../index';
import useGetSetRef from '../../../hooks/useGetSetRef';

const useFormWidget = ({ formName, onAction = defaultFunc, onAfterSaved }) => {
  const polyglot = usePolyglot();

  const {
    getFormConfig,
    addFormIntegrations,
    getFormIntegrations,
    getFieldErrors,
    setFieldErrors,
    getFormEvents,
    getInitialValues,
    emitEvent,
    onEventEmitters,
  } = useForm(formName, { fireFormConfigReduce: true });

  const initialValues = cloneDeep(getInitialValues() || {});

  const { set: setValues, get: getFormValues } = useGetSetRef(initialValues);
  const [, resetFormValues] = useState(null);

  const setFormValues = values => {
    setValues(values);
    resetFormValues({ ...(values || {}) });
  };

  const resetForm = () => {
    setFormValues(initialValues);
    setFieldErrors({});
  };

  const onFieldChange = (name, value) => event => {
    setFormValues({ ...getFormValues(), [name]: value });
    const formEvents = getFormEvents();
    const fieldEventChangedName = createFieldEventChanged(name);
    const fieldChangedName = createFieldChanged(name);
    fieldChanged({ fieldName: name, value, event })(
      formEvents[fieldEventChangedName],
      formEvents[fieldChangedName],
      formEvents[FIELD_CHANGED]
    );
  };

  const showErrorMessage = validateStrategy => {
    PubSub.publish(
      { message: validateStrategy.getErrors(), kind: NotificationKind.Error },
      SUBSCRIPTION.Notification
    );
  };

  const getModifiedItem = () => {
    const { reduceModifiedItem: callbackReduceSelectedItem } = getFormIntegrations();
    const formValues = getFormValues();
    const modifiedItem = reduceModifiedItem({ modifiedItem: formValues })(
      callbackReduceSelectedItem
    );
    return modifiedItem;
  };

  const attemptToValidateAndGetModifiedItem = () => {
    const { fields } = getFormConfig();
    const formValues = getFormValues();
    const validateStrategy = createValidatorStrategy({ polyglot });
    const validationResult = validateFields({ fields, validateStrategy, formValues, emitEvent });
    const { disabled, errors } = validationResult;

    if (disabled) {
      setFieldErrors(errors);
      resetFormValues({ ...formValues });
      if (validateStrategy.hasErrors()) {
        showErrorMessage(validateStrategy);
      }
      return false;
    }

    const modifiedItem = getModifiedItem();

    const { validateBeforeSave: callbackValidateBeforeSave } = getFormIntegrations();
    validateBeforeSave({ modifiedItem, validateStrategy, validationResult })(
      callbackValidateBeforeSave
    );

    if (validateStrategy.hasErrors()) {
      showErrorMessage(validateStrategy);
      return false;
    }

    return modifiedItem;
  };

  const save = () => {
    const modifiedItem = attemptToValidateAndGetModifiedItem();
    if (!modifiedItem) {
      return;
    }
    const payload = onAfterSaved ? { body: modifiedItem, callback: onAfterSaved } : modifiedItem;
    onAction(payload);
  };

  onEventEmitters({ validateAndGetModifiedItem: attemptToValidateAndGetModifiedItem });
  addFormIntegrations({ getFormValues, getModifiedItem });

  return {
    setFormValues,
    getFormValues,
    getFieldErrors,
    save,
    reset: resetForm,
    onFieldChange,
    getFormConfig,
    getFormIntegrations,
  };
};

export default useFormWidget;
