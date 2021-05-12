import { useState, useEffect } from 'react';
import { validateFields } from '../../../helper/FormHelper';
import { useGridCtx } from './GridProvider';

const useGridRow = ({ rowData: propRowData, rowIndex }) => {
  const [customColumns, renderRow] = useState(null);
  const {
    getColumns: getColumnsFromCtx,
    getCustomRowColumns,
    getCustomRowConfig,
    addGridRow,
    getIntegrations,
    setCustomRow,
  } = useGridCtx();

  const refreshRow = () => {
    renderRow(getCustomRowColumns(rowIndex));
  };

  useEffect(() => {
    const { reduceRowDef } = getIntegrations();
    if (reduceRowDef != null) {
      const newRowDef = reduceRowDef({ rowData: propRowData, rowIndex });
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

  const getRowConfig = (defaultConfig = {}) => {
    const rowConfig = getCustomRowConfig(rowIndex);
    return {
      ...defaultConfig,
      ...rowConfig,
    };
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
    getRowConfig,
    validate,
  };

  addGridRow(rowIndex, rowResult);

  return rowResult;
};

export default useGridRow;
