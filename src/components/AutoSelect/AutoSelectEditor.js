import React, { useMemo } from 'react';
import { defaultFunc } from '../../utils/props';
import AutoSelect from './AutoSelect';
import { convertToOptions } from '../../utils/convert';
import {
  convertToEditorValueBaseOnType,
  formatFieldValueBaseOnType,
} from '../../utils/FormatUtils';

const AutoSelectEditor = ({
  value,
  error,
  label,
  component,
  type,
  multiple,
  onChange = defaultFunc,
  name,
  ...restProps
}) => {
  const {
    valueAttr: propValueAttr,
    labelAttr: propLabelAttr,
    data: propComponentData = [],
  } = component;
  const valueAttr = propValueAttr || 'value';
  const labelAttr = propLabelAttr || 'label';
  const propOptions =
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

  const options = propOptions != null ? propOptions : [];

  const handleChange = (event, selectedItem) => {
    let targetValue = null;
    if (selectedItem) {
      console.log('selectedItem', selectedItem);
      targetValue = formatFieldValueBaseOnType({
        value: multiple ? selectedItem.map(item => item.value) : selectedItem.value,
        type,
        multiple,
        component: {
          data: propComponentData,
          valueAttr,
          labelAttr,
        },
      });
      console.log('targetValue', targetValue);
    }

    onChange({ value: targetValue, selectedItem, event });
  };

  return (
    <AutoSelect
      error={error}
      value={convertToEditorValueBaseOnType({ value, type, component: { valueAttr } })}
      label={label}
      multiple={multiple}
      onChange={handleChange}
      name={name}
      options={options}
      {...restProps}
    />
  );
};

export default AutoSelectEditor;
