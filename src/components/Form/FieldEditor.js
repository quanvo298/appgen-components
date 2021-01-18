import React from 'react';
import Select from '../Select/Select';
import AutoSelect from '../AutoSelect/AutoSelect';
import { TrueOrFalseOptions } from '../config';
import { isObject } from '../../utils/ObjectUtils';
import { defaultFunc } from '../../utils/props';
import { getEditorComponent } from '../../helper/ConfigModuleHelper';
import { FieldComponentType, FieldType } from '../../utils/constant';
import BasicFieldEditor from './BasicFieldEditor';
import GridContext from '../Table/hooks/GridContext';
import GridProvider from '../Table/hooks/GridProvider';
import GridComponent from '../GridEditor/GridComponent';

const processGridComponent = props => {
  const { component = {}, name, value } = props;

  const gridContext = new GridContext({
    columns: component.columns,
    gridData: value,
    name,
  });

  return (
    <GridProvider context={gridContext}>
      <GridComponent {...props} />
    </GridProvider>
  );
};

const processSelectComponent = ({
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
    const { target } = event;
    onChange({ value: target.value, event });
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

const processAutoSelectComponent = ({
  value,
  error,
  label,
  component,
  type,
  onChange = defaultFunc,
  name,
  ...restProps
}) => {
  const { valueAttr, labelAttr = 'label', data: propComponentData = [] } = component;
  const propOptions =
    valueAttr != null
      ? propComponentData.reduce((jsonArray, element) => {
          jsonArray.push({
            value: element[valueAttr || 'value'],
            label: element[labelAttr],
          });
          return jsonArray;
        }, [])
      : propComponentData;

  const options = propOptions != null ? propOptions : [];
  const multi = type === FieldType.ArrayObject;

  const handleChange = (event, itemValue) => {
    let targetValue = null;
    if (itemValue) {
      targetValue = multi ? itemValue.map(item => item.value) : itemValue.value;
    }
    onChange({ value: targetValue, selectedItem: itemValue, event });
  };

  return (
    <AutoSelect
      error={error}
      value={value}
      label={label}
      multi={multi}
      onChange={handleChange}
      name={name}
      options={options}
      {...restProps}
    />
  );
};

const processEditorComponent = (
  EditorComponent,
  { onChange = defaultFunc, name, ...restProps }
) => <EditorComponent onChange={onChange} {...restProps} />;

const FieldEditor = React.forwardRef((props, ref) => {
  const { component } = props;
  const { type: componentType = '' } = component != null ? component : {};

  switch (componentType) {
    case FieldComponentType.Grid:
      return processGridComponent(props, ref);
    case FieldComponentType.Select:
      return processSelectComponent(props);
    case FieldComponentType.AutoSelect:
      return processAutoSelectComponent(props);
    default: {
      const EditorComponent = getEditorComponent(componentType);
      if (EditorComponent) {
        return processEditorComponent(EditorComponent, props);
      }
      return <BasicFieldEditor {...props} />;
    }
  }
});
export default FieldEditor;
