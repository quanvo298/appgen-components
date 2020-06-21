import React from 'react';
import { TextField } from '@material-ui/core';
import { defaultFunc } from '../../utils/props';
import { isDatePropertyType } from '../../utils/FormatUtils';
import { formatToNativeDateFormComponent } from '../../utils/DateUtils';

const getValueBaseonType = (cellValue, type) => {
  if (cellValue && isDatePropertyType(type)) {
    return formatToNativeDateFormComponent(new Date(cellValue));
  }
  return cellValue || '';
};

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
  onInputChange = defaultFunc,
}) => (
  <TextField
    label={label}
    variant={variant}
    fullWidth
    required={required}
    error={error}
    disabled={disabled || readonly}
    InputLabelProps={{
      ...labelProps,
    }}
    onChange={onInputChange(name)}
    InputProps={{ ...inputProps }}
    value={getValueBaseonType(value, type)}
    type={type}
  />
);

export default TextInput;
