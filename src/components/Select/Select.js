import React from 'react';
import MUISelect from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { defaultFunc } from '../../utils/props';

const Select = ({
  optionEmpty,
  options,
  value,
  label,
  error,
  disabled,
  required,
  variant = 'outlined',
  onChange = defaultFunc,
}) => (
  <FormControl fullWidth variant={variant}>
    {label && <InputLabel>{label}</InputLabel>}
    <MUISelect
      native
      fullWidth
      error={error}
      label={label}
      variant={variant}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
    >
      {optionEmpty && <option value="" />}
      {options.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </MUISelect>
  </FormControl>
);

export default Select;
