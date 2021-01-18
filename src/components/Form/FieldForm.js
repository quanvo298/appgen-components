import React, { useState, useEffect } from 'react';
import useFieldDefinition from '../../hooks/useFieldDefinition';
import FieldEditor from './FieldEditor';
import { containString } from '../../utils';
import { defaultFunc } from '../../utils/props';

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
  error: propError,
  onFieldChange = () => defaultFunc,
}) => {
  const { getFieldDefinition } = useFieldDefinition({
    name: propName,
    disabled,
    length,
    component,
    label,
    required,
    type,
    defaultValue,
  });

  const [fieldValue, setFieldValue] = useState(propValue);
  const [error, setError] = useState(propError);

  useEffect(() => {
    if (propValue.value !== fieldValue.value) {
      setFieldValue(propValue);
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
    onFieldChange(propName, newValue)(event);
    const newFieldValue = shouldRender(event) ? {} : fieldValue;
    newFieldValue.value = newValue;
    setFieldValue(newFieldValue);
  };

  const handleChange = ({ value, event }) => {
    processChange(value)(event);
  };

  return (
    <FieldEditor
      variant={variant}
      {...getFieldDefinition()}
      value={fieldValue.value}
      error={error}
      onChange={handleChange}
    />
  );
};

export default FieldForm;
