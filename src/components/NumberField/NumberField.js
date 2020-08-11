import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { PropertyDataType } from '../../utils/constant';
import { formatValueBaseOnType } from '../../utils/FormatUtils';

const NumberField = ({
  name,
  value,
  error,
  disabled,
  inputProps = {},
  elementProps = {},
  onInputChange,
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
    textValue = isEditing
      ? textValue
      : formatValueBaseOnType({ cellValue: textValue, type: PropertyDataType.Number });
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
      variant={variant}
      error={error}
      InputLabelProps={{
        shrink: textValue || isEditing,
        ...elementProps,
      }}
      onChange={onInputChange && onInputChange(name)}
      onKeyPress={onKeyPress && onKeyPress(name)}
      type={type}
      disabled={disabled}
      required={required}
      {...fieldEvents}
      InputProps={{ ...inputProps }}
      value={textValue || null}
    />
  );
};

export default NumberField;
