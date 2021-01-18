import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { PropertyDataType } from '../../utils/constant';
import { formatCellNumberValue } from '../../utils/FormatUtils';
import { defaultFunc } from '../../utils/props';

const NumberField = ({
  name,
  value,
  error,
  disabled,
  inputProps = {},
  elementProps = {},
  onChange = defaultFunc,
  onKeyPress,
  label,
  variant = 'outlined',
  required,
}) => {
  const [isEditing, setEditing] = useState(false);

  const toggleEditing = () => {
    const newEditing = disabled ? false : !isEditing;
    setEditing(newEditing);
  };

  const type = isEditing ? PropertyDataType.Number : PropertyDataType.Text;

  let textValue = value;
  if (textValue) {
    textValue = isEditing ? textValue : formatCellNumberValue(textValue);
  }
  let fieldEvents = {};
  if (isEditing) {
    fieldEvents = {
      onBlur: toggleEditing,
    };
  } else {
    fieldEvents = {
      onFocus: toggleEditing,
    };
  }

  return (
    <TextField
      label={label}
      fullWidth
      error={error}
      InputLabelProps={{
        shrink: Boolean(textValue) || isEditing,
        ...elementProps,
      }}
      onChange={onChange}
      onKeyPress={onKeyPress && onKeyPress(name)}
      type={type}
      disabled={disabled}
      required={required}
      {...fieldEvents}
      InputProps={{ ...inputProps }}
      value={textValue || ''}
      {...(Boolean(variant) && { variant })}
    />
  );
};

export default NumberField;
