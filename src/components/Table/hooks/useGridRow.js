import { useEffect, useState } from 'react';
import { validateFields } from '../../../helper/FormHelper';
import { useGridCtx } from './GridProvider';

const useGridRow = ({ rowData, rowIndex }) => {
  const [customColumns, renderRow] = useState([]);
  const {
    getColumns: getColumnsFromCtx,
    getCustomRowColumns,
    getCustomRowConfig,
    addGridRow,
    getIntegrations,
    setCustomRow,
    getGridRowData,
    setGridRowData,
    getGridRow,
  } = useGridCtx();

  const refreshRow = () => {
    renderRow([...getCustomRowColumns(rowIndex)]);
  };

  useEffect(() => {
    const { reduceRowDef } = getIntegrations();
    if (reduceRowDef != null) {
      const newRowDef = reduceRowDef({ rowData, rowIndex });
      const { cells, ...restProps } = newRowDef || {};
      if (cells != null) {
        setCustomRow(rowIndex, {
          cells: Object.keys(cells).map(columnsName => ({
            name: columnsName,
            ...cells[columnsName],
          })),
          ...restProps,
        });
      }
    }
    refreshRow();
  }, [rowData]);

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

  const getRowConfig = (defaultConfig = {}) => {
    const rowConfig = getCustomRowConfig(rowIndex);
    return {
      ...defaultConfig,
      ...rowConfig,
    };
  };

  const validate = formValues => {
    const columns = getColumns() || [];

    const validationResult = validateFields({
      fields: columns.reduce((result, column) => {
        const { name } = column;
        result[name] = column;
        return result;
      }, {}),
      formValues,
    });

    return validationResult;
  };

  const movePosition = ({ newRowIndex }) => {
    const newData = getGridRowData(newRowIndex);
    setGridRowData(rowIndex, newData);
    setGridRowData(newRowIndex, rowData);
    getGridRow(newRowIndex).refreshRow();
    refreshRow();
  };
  const moveUp = () => {
    movePosition({ newRowIndex: rowIndex - 1 });
  };

  const moveDown = () => {
    movePosition({ newRowIndex: rowIndex + 1 });
  };

  const rowResult = {
    refreshRow,
    getColumns,
    getRowConfig,
    validate,
    moveUp,
    moveDown,
  };

  addGridRow(rowIndex, rowResult);

  return rowResult;
};

export default useGridRow;
