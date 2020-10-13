import React from 'react';
import { Checkbox as MCheckbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { defaultFunc } from '../../utils/props';

const Checkbox = ({ name, value, label, error, disabled, onInputChange = defaultFunc }) => {
  const handleChange = event => {
    onInputChange(name, 'checked')(event);
  };
  return (
    <FormControlLabel
      control={<MCheckbox name={name} checked={Boolean(value)} onChange={handleChange} />}
      label={label}
      error={error || undefined}
      disabled={disabled}
    />
  );
};

export default Checkbox;
