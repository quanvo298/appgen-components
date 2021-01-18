import { useState, useEffect } from 'react';
import { validateFields } from '../../../helper/FormHelper';
import { useGridCtx } from './GridProvider';

const useGridRow = ({ rowData: propRowData, rowIndex }) => {
  const [customColumns, renderRow] = useState(null);
  const {
    getColumns: getColumnsFromCtx,
    getCustomRowColumn,
    addGridRow,
    getIntegrations,
    setCustomRowColumns,
  } = useGridCtx();

  const refreshRow = () => {
    renderRow(getCustomRowColumn(rowIndex));
  };

  useEffect(() => {
    const { reduceCellDefs } = getIntegrations();
    if (reduceCellDefs != null) {
      const newCellDefs = reduceCellDefs({ rowData: propRowData, rowIndex });
      if (newCellDefs != null) {
        const { cellsDef } = newCellDefs;
        setCustomRowColumns(
          rowIndex,
          Object.keys(cellsDef).map(columnsName => ({
            name: columnsName,
            ...cellsDef[columnsName],
          }))
        );
      }
    }
    refreshRow();
  }, [propRowData]);

  const getColumns = () => {
    const columns = getColumnsFromCtx();
    if (customColumns != null) {
      return columns.map(propColumn => {
        const { name: propName } = propColumn;
        const foundCustom = customColumns.find(customColumn => propName === customColumn.name);
        return foundCustom ? { ...propColumn, ...foundCustom } : propColumn;
      });
    }
    return columns;
  };

  const validate = rowData => {
    const columns = getColumns() || [];

    const validationResult = validateFields({
      fields: columns.reduce((result, column) => {
        const { name } = column;
        result[name] = column;
        return result;
      }, {}),
      formValues: rowData,
    });

    return validationResult;
  };

  const rowResult = {
    refreshRow,
    getColumns,
    validate,
  };

  addGridRow(rowIndex, rowResult);

  return rowResult;
};

export default useGridRow;
