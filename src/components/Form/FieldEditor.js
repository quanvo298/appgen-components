import React from 'react';
import AutoSelectEditor from '../AutoSelect/AutoSelectEditor';
import { defaultFunc } from '../../utils/props';
import { getEditorComponent } from '../../helper/ConfigModuleHelper';
import { FieldComponentType, FieldType } from '../../utils/constant';
import BasicFieldEditor from './BasicFieldEditor';
import GridContext from '../Table/hooks/GridContext';
import GridProvider from '../Table/hooks/GridProvider';
import GridEditor from '../GridEditor/GridEditor';
import MapEditor from '../MapEditor/MapEditor';
import SelectEditor from '../Select/SelectEditor';
import { cloneObjectDeep } from '../../utils';

const processGridComponent = props => {
  const { component = {}, name, value } = props;

  const gridContext = new GridContext({
    ordered: component.ordered,
    columns: component.columns,
    gridData: value != null ? cloneObjectDeep(value) : value,
    name,
  });

  return (
    <GridProvider context={gridContext}>
      <GridEditor {...props} />
    </GridProvider>
  );
};

const processEditorComponent = (
  EditorComponent,
  { onChange = defaultFunc, name, ...restProps }
) => <EditorComponent onChange={onChange} {...restProps} />;

const FieldEditor = props => {
  const { component, multiple: propMultiple, type } = props;

  const { type: componentType = '' } = component != null ? component : {};
  const multiple = type === FieldType.ArrayObject ? true : propMultiple;

  switch (componentType) {
    case FieldComponentType.Grid:
      return processGridComponent(props);
    case FieldComponentType.Map:
      return <MapEditor {...props} />;
    case FieldComponentType.Select:
      return <SelectEditor {...props} />;
    case FieldComponentType.AutoSelect:
      return <AutoSelectEditor {...props} multiple={multiple} />;
    default: {
      const EditorComponent = getEditorComponent(componentType);
      if (EditorComponent) {
        return processEditorComponent(EditorComponent, props);
      }
      return <BasicFieldEditor {...props} />;
    }
  }
};

export default FieldEditor;
