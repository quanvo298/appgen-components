import React from 'react';
import GridEditor from '../GridEditor/GridEditor';
import BasicEditor from './BasicEditor';
import Select from '../Select/Select';
import AutoSelect from '../AutoSelect/AutoSelect';
import { TrueOrFalseOptions } from '../config';
import { isObject } from '../../utils/ObjectUtils';
import { defaultFunc } from '../../utils/props';
import { getEditorComponent } from '../../helper/ConfigModuleHelper';

export const ComponentType = {
  Grid: 'grid',
  Select: 'select',
  AutoSelect: 'auto-select',
};

const processGridComponent = (props, ref) => {
  return <GridEditor {...props} ref={ref} />;
};

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
    name={name}
    {...restProps}
  />
);

const processEditorComponent = (
  EditorComponent,
  { onInputChange = defaultFunc, name, ...restProps }
) => <EditorComponent onChange={onInputChange(name)} {...restProps} />;

const ElementFormEditor = React.forwardRef((props, ref) => {
  const { type: componentType = '' } = props.component || {};

  switch (componentType) {
    case ComponentType.Grid:
      return processGridComponent(props, ref);
    case ComponentType.Select:
      return processSelectComponent(props);
    case ComponentType.AutoSelect:
      return processAutoSelectComponent(props);
    default: {
      const EditorComponent = getEditorComponent(componentType);
      if (EditorComponent) {
        return processEditorComponent(EditorComponent, props);
      }
      return <BasicEditor {...props} />;
    }
  }
});
export default ElementFormEditor;
