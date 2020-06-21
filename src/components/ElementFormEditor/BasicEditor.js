import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import TextInput from '../TextInput/TextInput';
import NumberField from '../NumberField/NumberField';
import DateTimeInput from '../DateTimeInput/DateTimeInput';

const processNumberComponent = props => <NumberField {...props} />;

const processDateTimeComponent = ({ name, onInputChange, ...restProps }) => (
  <DateTimeInput onChange={onInputChange(name)} {...restProps} />
);

const processBooleanType = props => <Checkbox {...props} />;

const processOtherType = ({ name, value, label, type, error, disabled, ...restProps }) => (
  <TextInput
    fullWidth
    name={name}
    label={label}
    error={error}
    value={value}
    type={type}
    disabled={disabled}
    {...restProps}
  />
);

const ElementTagBaseOnType = props => {
  const propType = props.type || '';
  switch (propType.toLowerCase()) {
    case 'boolean':
      return processBooleanType(props);
    case 'number':
      return processNumberComponent(props);
    case 'date':
      return processDateTimeComponent(props);
    default:
      return processOtherType(props);
  }
};

export default props => <ElementTagBaseOnType {...props} />;
