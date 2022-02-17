import React from 'react';
import GridContext from '../Table/hooks/GridContext';
import GridProvider from '../Table/hooks/GridProvider';
import Grid from '../GridEditor/Grid';

const ColumnDefs = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'value',
    label: 'Value',
  },
];

const convertValueToArray = value => {
  return value ? Object.keys(value).map(key => ({ name: key, value: value[key] })) : null;
};

const convertArrayToObject = values => {
  return values
    ? values.reduce((result, element) => {
        const { name, value } = element;
        result[name] = value;
        return result;
      }, {})
    : null;
};

const MapEditor = props => {
  const { component = {}, name, value, onChange } = props;
  const { columns = [] } = component;
  const newColumns = [];
  const nameColumnDef = columns.find(({ name: propName }) => propName === ColumnDefs[0].name);
  const valueColumnDef = columns.find(({ name: propName }) => propName === ColumnDefs[1].name);
  newColumns.push(nameColumnDef || { ...ColumnDefs[0] });
  newColumns.push(valueColumnDef || { ...ColumnDefs[1] });
  component.columns = newColumns;

  const gridContext = new GridContext({
    columns: component.columns,
    gridData: convertValueToArray(value),
    name,
  });

  const handleChange = event => {
    const propValue = event.target.value;
    if (onChange) {
      onChange({ value: propValue != null ? convertArrayToObject(propValue) : null, event });
    }
  };

  return (
    <GridProvider context={gridContext}>
      <Grid {...props} component={component} onChange={handleChange} />
    </GridProvider>
  );
};

export default MapEditor;
