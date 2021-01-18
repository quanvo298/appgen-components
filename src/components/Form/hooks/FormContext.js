import { defaultFunc } from '../../../utils/props';

const FormContext = ({ formConfig: propConfig, initialValues }) => {
  const properties = {
    formConfig: propConfig,
    values: initialValues,
    fieldErrors: {},
    formIntegrations: {
      reduceSelectedItem: null,
      reduceModifiedItem: null,
      reduceFormConfig: null,
      validateBeforeSave: defaultFunc(),
    },
    formEvents: {
      onFieldChange: defaultFunc,
    },
    eventEmitters: {},
  };

  const setFormConfig = newFormConfig => {
    properties.formConfig = newFormConfig;
  };

  const getFormConfig = () => properties.formConfig;

  const setFormValues = formValues => {
    properties.values = formValues;
  };

  const getFormValues = () => properties.values;

  const getFormEvents = () => properties.formEvents;

  const addFormEvents = (events = {}) => {
    const { formEvents } = properties;
    Object.keys(events).forEach(eventName => {
      formEvents[eventName] = events[eventName];
    });
  };

  const fireFormEvent = (eventName, payload) => {
    const { formEvents } = properties;
    const callback = formEvents[eventName];
    if (callback) {
      callback(payload);
    }
  };

  const getFieldErrors = () => properties.fieldErrors;

  const setFieldErrors = errors => {
    properties.fieldErrors = errors;
  };

  const getFormIntegrations = () => properties.formIntegrations;

  const addFormIntegrations = (events = {}) => {
    const { formIntegrations } = properties;
    Object.keys(events).forEach(eventName => {
      formIntegrations[eventName] = events[eventName];
    });
  };

  const onFieldChange = ({ name, value, event }) => {
    const { formEvents, values } = properties;
    values[name] = value;
    formEvents.onFieldChange({ name, value, event });
  };

  const onEventEmitters = (events = {}) => {
    const { eventEmitters } = properties;
    Object.keys(events).forEach(eventName => {
      eventEmitters[eventName] = events[eventName];
    });
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
    setFormConfig,
    getFormConfig,
    setFormValues,
    getFormValues,
    getFieldErrors,
    setFieldErrors,
    onFieldChange,
    getFormEvents,
    addFormEvents,
    fireFormEvent,
    getFormIntegrations,
    addFormIntegrations,
    onEventEmitters,
    emitEvent,
  };
};

export default FormContext;
