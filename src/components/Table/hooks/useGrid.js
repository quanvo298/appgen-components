import { useState, useEffect } from 'react';
import { processInitialRowValue } from '../../../helper/FormHelper';
import { useGridCtx } from './GridProvider';
import useGetSetRef from '../../../hooks/useGetSetRef';

const useGrid = ({ mode, error }) => {
  const {
    setProperties,
    getGridData,
    addGridRowData,
    deleteGridRow,
    getRowsNo,
    getColumns,
    getGridRow,
    setCustomRowColumns,
  } = useGridCtx();
  const [stateGrid, refreshGrid] = useState([]);
  const { get: getErrors, set: setErrors } = useGetSetRef([...Array(getRowsNo())]);

  useEffect(() => {
    if (!error) {
      setErrors([...Array(getRowsNo())]);
    }
  }, [error]);

  setProperties({ mode });

  const addRowError = () => {
    const errorsRef = getErrors();
    errorsRef.push(undefined);
    setErrors(errorsRef);
  };

  const addRow = () => {
    const newRowData = processInitialRowValue({ columns: getColumns() });
    addGridRowData(newRowData);
    addRowError();
    refreshGrid([...stateGrid]);
  };

  const removeRowError = rowIndex => {
    const errorsRef = getErrors();
    errorsRef.splice(rowIndex, 1);
    setErrors(errorsRef);
  };

  const deleteRow = rowIndex => {
    removeRowError(rowIndex);
    deleteGridRow(rowIndex);
    refreshGrid([...stateGrid]);
  };

  const setCellValue = ({ cellName, cellValue, rowIndex }) => {
    const gridData = getGridData();
    if (gridData.length >= rowIndex) {
      gridData[rowIndex][cellName] = cellValue;
      setProperties({ gridData });
    }
  };

  const setRowColumnDefs = ({ rowIndex, columns }) => {
    if (getRowsNo() > rowIndex) {
      setCustomRowColumns(
        rowIndex,
        Object.keys(columns).map(columnsName => ({ name: columnsName, ...columns[columnsName] }))
      );
      const { refreshRow } = getGridRow(rowIndex);
      refreshRow();
    }
  };

  const validate = () => {
    const gridData = getGridData();
    if (gridData && gridData.length) {
      const errorsRef = getErrors();
      let hasError = false;
      gridData.forEach((rowData, rowIndex) => {
        const { validate: validateRow } = getGridRow(rowIndex);
        const { disabled, errors } = validateRow(rowData);
        errorsRef[rowIndex] = errors;
        if (disabled) {
          hasError = true;
        }
        return disabled;
      });
      setErrors(errorsRef);
      return !hasError;
    }
    return true;
  };

  return {
    addRow,
    deleteRow,
    setCellValue,
    validate,
    getErrors,
    setRowColumnDefs,
  };
};

export default useGrid;
