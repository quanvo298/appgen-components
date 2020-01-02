import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import AutoSelect from '../AutoSelect/AutoSelect';
import { TrueOrFalseOptions } from '../config';

const processSelectComponent = props => {
  if (props.type === 'boolean') {
    return (
      <Select
        native
        fullWidth
        error={props.error}
        value={props.value}
        onChange={props.onInputChange && props.onInputChange(props.name)}
      >
        <option value="" />
        {TrueOrFalseOptions.map((option, index) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </Select>
    );
  }
  return (
    <Select
      native
      fullWidth
      error={props.error}
      value={props.value}
      onChange={props.onInputChange && props.onInputChange(props.name)}
    >
      {props.component.optionEmpty && <option value="" />}
      {props.component.data.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

const processAutoSelectComponent = props => (
  <AutoSelect
    error={props.error}
    value={props.value}
    component={props.component}
    onChange={props.onInputChange && props.onInputChange(props.name)}
  />
);

const processBooleanType = props => (
  <Checkbox
    checked={props.value}
    onChange={props.onInputChange && props.onInputChange(props.name, 'checked')}
    value="true"
  />
);

const processOtherType = ({
  name,
  value,
  type,
  error,
  disabled,
  inputProps = {},
  elementProps = {},
  onInputChange,
  onKeyPress,
}) => (
  <TextField
    fullWidth
    error={error}
    InputLabelProps={{
      shrink: true,
      ...elementProps,
    }}
    onChange={onInputChange && onInputChange(name)}
    onKeyPress={onKeyPress && onKeyPress(name)}
    value={value || ''}
    type={type}
    disabled={disabled}
    InputProps={{ ...inputProps }}
  />
);

const ElementTagBaseOnType = props => {
  switch (props.type) {
    case 'boolean':
      return processBooleanType(props);
    default:
      return processOtherType(props);
  }
};

const ElementTagBaseOnComponent = props => {
  switch (props.component.type) {
    case 'select':
      return processSelectComponent(props);
    case 'auto-select':
      return processAutoSelectComponent(props);
    default:
      return <> </>;
  }
};

export default props =>
  props.component ? <ElementTagBaseOnComponent {...props} /> : <ElementTagBaseOnType {...props} />;
