import React, { useMemo } from 'react';
import { defaultFunc } from '../../utils/props';
import { FieldType } from '../../utils/constant';
import { TrueOrFalseOptions } from '../config';
import { isObject } from '../../utils';
import { formatFieldValueBaseOnType } from '../../utils/FormatUtils';
import Select from './Select';
import { convertToOptions } from '../../utils/convert';

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
  const {
    valueAttr: propValueAttr,
    labelAttr: propLabelAttr,
    optionEmpty: propOptionEmpty,
    data: propComponentData,
    additionalAttrs,
  } = component;
  const valueAttr = propValueAttr || 'value';
  const labelAttr = propLabelAttr || 'label';
  let componentData = type === FieldType.Boolean ? TrueOrFalseOptions : propComponentData;
  if (type !== FieldType.Boolean) {
    componentData =
      propValueAttr || propLabelAttr
        ? useMemo(
            () =>
              convertToOptions({
                list: propComponentData,
                value: valueAttr,
                label: labelAttr,
              }),
            [propComponentData]
          )
        : propComponentData;
  }

  const optionEmpty = type === FieldType.Boolean ? true : propOptionEmpty;
  const propValue = value != null && isObject(value) ? value[valueAttr] : value;
  const selectedValue = propValue == null && optionEmpty ? '' : propValue;

  const handleChange = event => {
    event.preventDefault();
    event.stopPropagation();
    const { value: targetValue } = event.target;
    const selected = formatFieldValueBaseOnType({
      value: targetValue,
      type,
      component: { data: propComponentData, valueAttr, labelAttr, additionalAttrs },
    });
    onChange({
      value: selected,
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
