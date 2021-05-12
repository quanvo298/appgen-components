import React from 'react';
import { defaultFunc } from '../../utils/props';
import { FieldType } from '../../utils/constant';
import { TrueOrFalseOptions } from '../config';
import { isObject } from '../../utils';
import { formatFieldValueBaseOnType } from '../../utils/FormatUtils';
import Select from './Select';

const SelectEditor = ({
  type,
  component,
  error,
  label,
  name,
  value,
  onChange = defaultFunc,
  variant = 'outlined',
  ...restProps
}) => {
  const { valueAttr = 'value', optionEmpty: propOptionEmpty, data: propComponentData } = component;
  const componentData = type === FieldType.Boolean ? TrueOrFalseOptions : propComponentData;
  const optionEmpty = type === FieldType.Boolean ? true : propOptionEmpty;

  const propValue = value != null && isObject(value) ? value[valueAttr] : value;
  const selectedValue = propValue == null && optionEmpty ? '' : propValue;

  const handleChange = event => {
    event.preventDefault();
    event.stopPropagation();
    const { value: targetValue } = event.target;

    onChange({
      value: formatFieldValueBaseOnType({
        value: targetValue,
        type,
        component: { data: propComponentData, valueAttr },
      }),
      event,
    });
  };

  return (
    <Select
      fullWidth
      error={error}
      label={label}
      variant={variant}
      value={selectedValue}
      onChange={handleChange}
      optionEmpty={optionEmpty}
      options={componentData}
      {...restProps}
    />
  );
};

export default SelectEditor;
