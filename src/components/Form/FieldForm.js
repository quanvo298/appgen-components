import React, { useEffect, useState } from 'react';
import useFieldDefinition from './hooks/useFieldDefinition';
import FieldEditor from './FieldEditor';
import { containString } from '../../utils';
import { defaultFunc } from '../../utils/props';
import { useForm } from './hocs/FormProvider';

const FieldForm = ({
  name: propName,
  value: propValue = undefined,
  optProps = {},
  variant,
  disabled,
  length,
  component,
  label,
  required,
  type,
  defaultValue,
  multiple,
  error: propError,
  onFieldChange = () => defaultFunc,
}) => {
  const { addFieldIntegrations } = useForm();
  const { getFieldDefinition, setFieldDefinition, setFieldComponentData } = useFieldDefinition({
    name: propName,
    disabled,
    length,
    component,
    label,
    required,
    type,
    defaultValue,
    multiple,
  });

  const [fieldValue, updateFieldValue] = useState(propValue);
  const [error, setError] = useState(propError);

  useEffect(() => {
    if (propValue.value !== fieldValue.value) {
      updateFieldValue(propValue);
    }
  }, [propValue]);

  useEffect(() => {
    setError(propError);
  }, [propError]);

  const shouldRender = (event = {}) => {
    const { target = {} } = event;
    const { payload = {} } = target;
    return !payload.sourceEvent;
  };

  const processChange = newValue => event => {
    const { regExp } = optProps;
    if (regExp && newValue && !containString(newValue, regExp)) {
      return;
    }
    const newFieldValue = shouldRender(event) ? {} : fieldValue;
    newFieldValue.value = newValue;
    updateFieldValue(newFieldValue);
    onFieldChange(propName, newValue)(event);
  };

  const handleChange = ({ value, event }) => {
    processChange(value)(event);
  };

  const setFieldValue = value => {
    processChange(value)();
  };

  const getFieldValue = () => {
    return fieldValue.value;
  };

  addFieldIntegrations(propName, {
    setFieldValue,
    setFieldDefinition,
    getFieldValue,
    setFieldComponentData,
  });

  return (
    <FieldEditor
      variant={variant}
      {...getFieldDefinition()}
      value={fieldValue.value || defaultValue}
      error={error}
      onChange={handleChange}
    />
  );
};

export default FieldForm;
