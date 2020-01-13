import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import AutoSelect from '../AutoSelect/AutoSelect';
import { TrueOrFalseOptions } from '../config';
import { isDatePropertyType } from '../../utils/FormatUtils';
import { formatToNativeDateFormComponent } from '../../utils/DateUtils';
import NumberField from '../NumberField/NumberField';
import { isObject } from '../../utils/StringUtils';

const processSelectComponent = props => {
  const { type, component } = props;
  const componentData = type === 'boolean' ? TrueOrFalseOptions : component.data;
  const optionEmpty = type === 'boolean' ? true : component.optionEmpty;
  const propsValueAtt = component.valueAtt || 'value';
  let propsValue = props.value || '';
  if (isObject(propsValue)) {
    propsValue = propsValue[propsValueAtt] || '';
  }
  return (
    <Select
      native
      fullWidth
      error={props.error}
      value={propsValue}
      onChange={props.onInputChange && props.onInputChange(props.name)}
    >
      {optionEmpty && <option value="" />}
      {componentData.map((option, index) => (
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

const processNumberComponent = props => <NumberField {...props} />;

const processBooleanType = props => (
  <Checkbox
    checked={props.value}
    onChange={props.onInputChange && props.onInputChange(props.name, 'checked')}
    value="true"
  />
);

const getValueBaseonType = (cellValue, type) => {
  if (cellValue && isDatePropertyType(type)) {
    return formatToNativeDateFormComponent(new Date(cellValue));
  }
  return cellValue || '';
};

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
    value={getValueBaseonType(value, type)}
    type={type}
    disabled={disabled}
    InputProps={{ ...inputProps }}
  />
);

const ElementTagBaseOnType = props => {
  switch (props.type) {
    case 'boolean':
      return processBooleanType(props);
    case 'number':
      return processNumberComponent(props);
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
