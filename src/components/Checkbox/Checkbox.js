import React from 'react';
import { Checkbox as MCheckbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { defaultFunc } from '../../utils/props';

const Checkbox = ({ name, value, label, error, disabled, onChange = defaultFunc }) => {
  const handleChange = event => {
    event.preventDefault();
    event.stopPropagation();
    event.target.value = event.target.checked ? 'checked' : null;
    onChange(event);
  };
  return (
    <FormControlLabel
      control={<MCheckbox name={name} checked={!!value} onChange={handleChange} />}
      label={label}
      error={error || undefined}
      disabled={disabled}
    />
  );
};

export default Checkbox;
