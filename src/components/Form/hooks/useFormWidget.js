import { useState, useEffect } from 'react';
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
  reduceModifiedItem,
  reduceSelectedItem,
  validateBeforeSave,
  validateFields,
} from '../../../helper/FormHelper';
import PubSub, { SUBSCRIPTION } from '../../../utils/PubSub';
import { createValidatorStrategy } from '../../../helper/Validator';
import { useForm } from '../../index';
import useGetSetRef from '../../../hooks/useGetSetRef';

const getModelForm = selectedItem =>
  isUpdated(selectedItem) ? ModeFormType.UPDATE : ModeFormType.NEW;

const initializeFormValues = ({ initialValues, selectedItem, formIntegrations }) => {
  const modeForm = getModelForm(selectedItem);
  if (!initialValues && modeForm === ModeFormType.NEW) {
    return null;
  }

  if (initialValues && modeForm === ModeFormType.NEW) {
    const initial = cloneDeep(initialValues);
    return initial;
  }

  const { reduceSelectedItem: callbackReduceSelectedItem } = formIntegrations;
  const item = reduceSelectedItem({ selectedItem })(callbackReduceSelectedItem);
  return item;
};

const useFormWidget = ({
  formName,
  selectedItem = null,
  onUpdate = defaultFunc,
  onSave = defaultFunc,
  onAfterSaved,
}) => {
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

  const modeForm = getModelForm(selectedItem);
  const initialValues = initializeFormValues({
    initialValues: getInitialValues(),
    formIntegrations: getFormIntegrations(),
    selectedItem,
    formConfig: getFormConfig(),
  });

  const { set: setFormValues, get: getFormValues } = useGetSetRef(initialValues);
  const [, resetFormValues] = useState(null);

  const polyglot = usePolyglot();

  const resetForm = () => {
    const newFormValues = initializeFormValues({
      initialValues: getInitialValues(),
      formIntegrations: getFormIntegrations(),
      selectedItem,
      formConfig: getFormConfig(),
    });

    setFormValues(newFormValues);
    setFieldErrors({});
    resetFormValues({ ...newFormValues });
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

    if (isUpdatedForm(modeForm)) {
      onUpdate(payload);
    } else if (isNewForm(modeForm)) {
      onSave(payload);
    }
  };

  useEffect(() => {
    resetForm();
  }, [selectedItem]);

  onEventEmitters({ validateAndGetModifiedItem: attemptToValidateAndGetModifiedItem });
  addFormIntegrations({ getFormValues, getModifiedItem });

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
