import React from 'react';
import { TextField } from '@material-ui/core';
import { defaultFunc } from '../../utils/props';

const TextInput = ({
  name,
  value,
  label,
  type,
  error,
  disabled,
  readonly,
  required,
  variant = 'outlined',
  inputProps = {},
  labelProps = {},
  onChange = defaultFunc,
}) => (
  <TextField
    name={name}
    label={label}
    fullWidth
    required={required}
    error={error}
    disabled={disabled || readonly}
    InputLabelProps={{
      ...labelProps,
    }}
    onChange={onChange}
    InputProps={{ ...inputProps }}
    value={value || ''}
    type={type}
    {...(Boolean(variant) && { variant })}
  />
);

export default TextInput;
