import React from 'react';
import GridEditor from '../GridEditor/GridEditor';
import BasicEditor from './BasicEditor';
import Select from '../Select/Select';
import AutoSelect from '../AutoSelect/AutoSelect';
import { TrueOrFalseOptions } from '../config';
import { isObject } from '../../utils/StringUtils';
import { defaultFunc } from '../../utils/props';

const processGridComponent = (props, ref) => <GridEditor {...props} ref={ref} />;

const processSelectComponent = ({
  type,
  component,
  error,
  label,
  name,
  value,
  onInputChange = defaultFunc,
  variant = 'outlined',
  ...restProps
}) => {
  const componentData = type === 'boolean' ? TrueOrFalseOptions : component.data;
  const optionEmpty = type === 'boolean' ? true : component.optionEmpty;
  const propsValueAtt = component.valueAtt || 'value';
  let propsValue = value || '';
  if (isObject(propsValue)) {
    propsValue = propsValue[propsValueAtt] || '';
  }
  return (
    <Select
      fullWidth
      error={error}
      label={label}
      variant={variant}
      value={propsValue}
      onChange={onInputChange(name)}
      optionEmpty={optionEmpty}
      options={componentData}
      {...restProps}
    />
  );
};

const processAutoSelectComponent = ({
  value,
  error,
  label,
  component,
  type,
  onInputChange = defaultFunc,
  name,
  ...restProps
}) => (
  <AutoSelect
    error={error}
    value={value}
    label={label}
    component={component}
    multi={type === 'arrayObject'}
    onChange={onInputChange(name)}
    {...restProps}
  />
);

const ElementFormEditor = React.forwardRef((props, ref) => {
  const { onCellChange, ...restProps } = props;
  const { type = '' } = props.component || {};

  switch (type) {
    case 'grid':
      return processGridComponent({ ...restProps, onCellChange }, ref);
    case 'select':
      return processSelectComponent(restProps);
    case 'auto-select':
      return processAutoSelectComponent(restProps);
    default:
      return <BasicEditor {...restProps} />;
  }
});
export default ElementFormEditor;
