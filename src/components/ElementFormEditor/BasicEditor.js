import React from 'react';
import { Checkbox } from '@material-ui/core';
import TextInput from '../TextInput/TextInput';
import NumberField from '../NumberField/NumberField';
import DateTimeInput from '../DateTimeInput/DateTimeInput';

import { defaultFunc } from '../../utils/props';

const processNumberComponent = props => <NumberField {...props} />;

const processDateTimeComponent = props => <DateTimeInput {...props} />;

const processBooleanType = ({ value, onInputChange = defaultFunc, name }) => (
  <Checkbox checked={value} onChange={onInputChange(name, 'checked')} value="true" />
);

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
  switch (props.type) {
    case 'boolean':
      return processBooleanType(props);
    case 'number':
      return processNumberComponent(props);
    case 'Date':
      return processDateTimeComponent(props);
    default:
      return processOtherType(props);
  }
};

export default props => <ElementTagBaseOnType {...props} />;
