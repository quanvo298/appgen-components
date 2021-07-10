import { defaultFunc } from '../../../utils/props';
import { cloneObjectDeep } from '../../../utils';
import { processInitialValues } from '../../../helper/FormHelper';

const FormNameDefault = `fnDefault_${new Date().getTime()}`;

const FieldIntegrationsDefault = {
  setFieldValue: defaultFunc,
  setFieldDefinition: defaultFunc,
  setFieldComponentData: defaultFunc,
};
const FormCtxPropertiesDefault = {
  fileViewName: null,
  formConfig: null,
  initialValues: null,
  fieldErrors: {},
  fieldIntegrations: {},
  formIntegrations: {
    reduceSelectedItem: null,
    reduceModifiedItem: null,
    reduceFormConfig: null,
    reduceContentListConfig: null,
    validateBeforeSave: defaultFunc,
    getModifiedItem: defaultFunc,
    getFormValues: defaultFunc,
  },
  customFormIntegration: null,
  formEvents: {},
  eventEmitters: {
    validateAndGetModifiedItem: defaultFunc,
  },
};

const copyToObject = (integrations = {}, events = {}) => {
  Object.keys(events).forEach(eventName => {
    integrations[eventName] = events[eventName];
  });
};

const FormCtxInstance = ({ formConfig: propConfig, fileViewName, initialValues }) => {
  const properties = {
    ...cloneObjectDeep(FormCtxPropertiesDefault),
    formConfig: propConfig,
    initialValues,
    fileViewName,
  };

  const getFormConfig = () => properties.formConfig;

  const setInitialValues = formValues => {
    properties.initialValues = formValues;
  };

  const getInitialValues = () => {
    const { initialValues: propInitialValues } = properties;
    const { fields } = getFormConfig() || {};
    if (!propInitialValues && fields) {
      const newInitialValues = processInitialValues({ fields });
      setInitialValues(newInitialValues);
      return newInitialValues;
    }
    return propInitialValues;
  };

  const getFormEvents = () => properties.formEvents;

  const addFormEvents = (events = {}) => {
    const { formEvents } = properties;
    Object.keys(events).forEach(eventName => {
      formEvents[eventName] = events[eventName];
    });
  };

  const getFieldErrors = () => properties.fieldErrors;

  const setFieldErrors = errors => {
    properties.fieldErrors = errors;
  };

  const getFormIntegrations = () => properties.formIntegrations;

  const addFormIntegrations = (events = {}) => {
    copyToObject(properties.formIntegrations, events);
  };

  const updateFieldFormConfig = (fieldName, fieldDefs) => {
    const { fields } = properties.formConfig;
    if (fields && fields[fieldName] && fieldDefs) {
      fields[fieldName] = {
        ...fields[fieldName],
        ...fieldDefs,
      };
    }
  };

  const setCustomFormIntegration = formIntegration => {
    properties.customFormIntegration = formIntegration;
  };

  const getCustomFormIntegration = () => properties.customFormIntegration;

  const fireFormConfigReduce = () => {
    const { reduceFormConfig } = getFormIntegrations();
    const { reduceFormConfig: customReduceFormConfig } = getCustomFormIntegration() || {};
    if (reduceFormConfig) {
      const newFormConfig = reduceFormConfig(properties.formConfig);
      if (newFormConfig) {
        properties.formConfig = newFormConfig;
      }
    }

    if (customReduceFormConfig) {
      const newFormConfig = customReduceFormConfig(properties.formConfig);
      if (newFormConfig) {
        properties.formConfig = newFormConfig;
      }
    }
  };

  const getFieldIntegrations = fieldName => {
    const { fieldIntegrations } = properties;
    return fieldIntegrations[fieldName] || FieldIntegrationsDefault;
  };

  const addFieldIntegrations = (fieldName, events = {}) => {
    const { fieldIntegrations } = properties;
    fieldIntegrations[fieldName] = {};
    copyToObject(fieldIntegrations[fieldName], events);
  };

  const onEventEmitters = (events = {}) => {
    copyToObject(properties.eventEmitters, events);
  };

  const emitEvent = (eventName, payload) => {
    const { eventEmitters } = properties;
    const callback = eventEmitters[eventName];
    if (callback) {
      return callback(payload);
    }
    return null;
  };

  return {
    getFormValues: () => getFormIntegrations().getFormValues(),
    getModifiedItem: () => getFormIntegrations().getModifiedItem(),
    getFormConfig,
    updateFieldFormConfig,
    fireFormConfigReduce,
    setCustomFormIntegration,
    setInitialValues,
    getInitialValues,
    getFieldErrors,
    setFieldErrors,
    getFormEvents,
    addFormEvents,
    getFormIntegrations,
    addFormIntegrations,
    getFieldIntegrations,
    addFieldIntegrations,
    onEventEmitters,
    emitEvent,
  };
};

const FormContext = (name, props) => {
  const processFormName = formName => (formName != null ? formName : FormNameDefault);
  let lastFormName = processFormName(name);

  const formGroups = {
    [lastFormName]: new FormCtxInstance(props),
  };

  const addForm = (formName, formProps) => {
    const processedFormName = processFormName(formName);
    delete formGroups[processedFormName];
    lastFormName = processedFormName;
    formGroups[lastFormName] = new FormCtxInstance(formProps);
  };

  const getForm = formName => {
    const processedFormName = processFormName(formName);
    return formGroups[processedFormName];
  };

  const setCurrentFormName = formName => {
    lastFormName = processFormName(formName);
  };

  const get = () => getForm(lastFormName);

  const clear = () => {
    Object.keys(formGroups).forEach(formName => {
      delete formGroups[formName];
    });
    formGroups[FormNameDefault] = new FormCtxInstance(props);
  };

  return {
    addForm,
    getForm,
    get,
    clear,
    setCurrentFormName,
  };
};

export default FormContext;
