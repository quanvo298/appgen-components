import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { PropertyDataType } from '../../utils/constant';
import { formatValueBaseOnType } from '../../utils/FormatUtils';

class NumberField extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  toggleEditing = () => {
    const { disabled } = this.props;
    const { isEditing } = this.state;
    const newEditing = disabled ? false : !isEditing;
    this.setState({ isEditing: newEditing });
  };

  render() {
    const {
      name,
      value,
      error,
      disabled,
      inputProps = {},
      elementProps = {},
      onInputChange,
      onKeyPress,
    } = this.props;
    const { isEditing } = this.state;
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
        onBlur: this.toggleEditing,
      };
    } else {
      fieldEvents = {
        onFocus: this.toggleEditing,
      };
    }
    return (
      <TextField
        fullWidth
        error={error}
        InputLabelProps={{
          shrink: true,
          ...elementProps,
        }}
        onChange={onInputChange && onInputChange(name)}
        onKeyPress={onKeyPress && onKeyPress(name)}
        {...fieldEvents}
        value={textValue || ''}
        type={type}
        disabled={disabled}
        InputProps={{ ...inputProps }}
      />
    );
  }
}

export default NumberField;
