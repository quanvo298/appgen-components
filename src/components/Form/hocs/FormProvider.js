import React, { createContext, useContext } from 'react';
import FormContext from './FormContext';
import { isString } from '../../../utils';

const FormCtx = createContext(null);

const FormProvider = ({ formName, formConfig, children }) => {
  const formContext = new FormContext(formName, { formConfig });
  return <FormCtx.Provider value={formContext}>{children}</FormCtx.Provider>;
};

export default FormProvider;

export const useForm = (arg1, arg2 = {}) => {
  const formContext = useContext(FormCtx);
  if (formContext == null) {
    return { initialized: false };
  }

  const supportFormName = isString(arg1);
  const props = supportFormName ? arg2 : arg1 || {};

  const { get, getForm, addForm, setCurrentFormName, clear } = formContext;
  const foundContext = supportFormName ? getForm(arg1) : get();
  if (supportFormName) {
    setCurrentFormName(arg1);
  }
  const {
    setFormConfig,
    getFormIntegrations,
    addFormIntegrations,
    getFieldIntegrations,
    addFormEvents,
    setInitialValues,
    setFormValues,
    onEventEmitters,
  } = foundContext;

  // eslint-disable-next-line no-prototype-builtins
  if (props.hasOwnProperty('formIntegrations')) {
    const { formIntegrations } = props;
    addFormIntegrations(formIntegrations);
  }

  // eslint-disable-next-line no-prototype-builtins
  if (props.hasOwnProperty('formEvents')) {
    const { formEvents } = props;
    addFormEvents(formEvents);
  }

  // eslint-disable-next-line no-prototype-builtins
  if (props.hasOwnProperty('eventEmitters')) {
    const { eventEmitters } = props;
    onEventEmitters(eventEmitters);
  }

  // eslint-disable-next-line no-prototype-builtins
  if (props.hasOwnProperty('formConfig')) {
    const { formConfig } = props;
    const { reduceFormConfig } = getFormIntegrations();
    setFormConfig(reduceFormConfig ? reduceFormConfig(formConfig) : formConfig);
  }

  // eslint-disable-next-line no-prototype-builtins
  if (props.hasOwnProperty('values')) {
    const { values } = props;
    setInitialValues(values);
    setFormValues(values);
  }

  const setFieldValue = (name, value) => {
    const { setFieldValue: propSetFieldValue } = getFieldIntegrations(name);
    propSetFieldValue(value);
  };

  const setFieldDefs = (name, defs = {}) => {
    const { setFieldDefinition } = getFieldIntegrations(name);
    setFieldDefinition(defs);
  };

  return {
    clear,
    getForm,
    addForm,
    initialized: true,
    ...foundContext,
    setFieldValue,
    setFieldDefs,
  };
};
