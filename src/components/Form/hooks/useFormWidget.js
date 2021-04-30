import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { isUpdated } from '../../../helper/ModelHelper';
import { ModeFormType, NotificationKind } from '../../../utils/constant';
import { defaultFunc } from '../../../utils/props';
import { usePolyglot } from '../../../utils';
import {
  createFieldChanged,
  createFieldEventChanged,
  FIELD_CHANGED,
  fieldChanged,
  isNewForm,
  isUpdatedForm,
  processInitialValues,
  reduceSelectedItem,
  validateBeforeSave,
  validateFields,
} from '../../../helper/FormHelper';
import PubSub, { SUBSCRIPTION } from '../../../utils/PubSub';
import { createValidatorStrategy } from '../../../helper/Validator';
import { useForm } from '../../index';

const getModelForm = selectedItem =>
  isUpdated(selectedItem) ? ModeFormType.UPDATE : ModeFormType.NEW;

const useFormWidget = ({
  formName,
  selectedItem = null,
  onUpdate = defaultFunc,
  onSave = defaultFunc,
}) => {
  const {
    getFormConfig,
    getFormIntegrations,
    setFormValues,
    getFormValues,
    getModifiedItem,
    getFieldErrors,
    setFieldErrors,
    getFormEvents,
    getInitialValues,
    emitEvent,
    onEventEmitters,
  } = useForm(formName, { fireFormConfigReduce: true });

  const modeForm = getModelForm(selectedItem);

  const [, resetFormValues] = useState(null);
  const polyglot = usePolyglot();

  const initializeFormValues = () => {
    const formValues = getFormValues();
    if (formValues) {
      return formValues;
    }

    const initialValuesDefault = getInitialValues();
    if (initialValuesDefault && modeForm === ModeFormType.NEW) {
      const initial = cloneDeep(initialValuesDefault);
      setFormValues(initial);
      return initial;
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
    if (isUpdatedForm(modeForm)) {
      onUpdate(modifiedItem);
    } else if (isNewForm(modeForm)) {
      onSave(modifiedItem);
    }
  };

  initializeFormValues();

  onEventEmitters({ validateAndGetModifiedItem: attemptToValidateAndGetModifiedItem });

  return {
    modeForm,
    getFormValues,
    getFieldErrors,
    save,
    reset: resetForm,
    onFieldChange,
    getFormConfig,
  };
};

export default useFormWidget;
