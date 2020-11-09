import React from 'react';
import MUITableRow from '@material-ui/core/TableRow';
import { CellValue, EditIconCell, DeleteIconCell } from './TableCell';
import { TABLE_MODE } from '../../utils/constant';
import useGetSetRef from '../../hooks/useGetSetRef';
import { defaultFunc } from '../../utils/props';
import { assignToRef } from '../../utils';

const TableRow = React.forwardRef((props, ref) => {
  const {
    classes,
    mode,
    columns,
    disabledDeleted,
    rowData,
    rowIndex,
    onFormatCellValue,
    onSelectedRow = defaultFunc,
    onDeleteRow = defaultFunc,
    onGetCellDefinition = defaultFunc,
    onChange = defaultFunc,
  } = props;
  const { getProp: getCellRef, setProp: setCellRef } = useGetSetRef({});
  // const [rowData, _] = useState(propRowData);
  // const [rowIndex, setRowIndex] = useState(propRowIndex);

  const setError = cellName => {
    const cellRef = getCellRef(cellName);
    cellRef.setFieldError(true);
  };

  const addElementFormRef = elementFormRef => {
    if (elementFormRef) {
      const { name } = elementFormRef;
      setCellRef(name, elementFormRef);
    }
  };

  const getCellDefinition = (cellName, index, column) => {
    return onGetCellDefinition(cellName, index, column);
  };

  const changeCellDefinition = (cellName, newCellDefinition) => {
    const currentCellDefinition = columns.find(({ name }) => name === cellName);

    if (currentCellDefinition) {
      const changedCellDefinition = { ...currentCellDefinition, ...newCellDefinition, label: '' };
      getCellRef(cellName).changeDefinition(changedCellDefinition);
    }
  };

  const handleInputChange = (cellName, value, index, column) => () => {
    rowData[cellName] = value;
    onChange(cellName, value, index, column);
  };

  assignToRef(ref, {
    changeCellDefinition,
    setError,
  });

  return (
    <MUITableRow className={TABLE_MODE.View === mode ? classes.trEditor : ''} hover>
      {columns.map((column, colIndex) => {
        const overrideColumn = getCellDefinition(column.name, rowIndex, column) || {};
        const cellValue =
          rowData[column.name] || overrideColumn.defaultValue || column.defaultValue;
        const key = colIndex + column.name + (cellValue ? cellValue.toString() : '');
        return (
          <CellValue
            key={key}
            row={rowData}
            column={column}
            mode={mode}
            onFormatCellValue={onFormatCellValue}
            cellValue={cellValue}
            forwardRef={cellRef => {
              addElementFormRef(cellRef, rowIndex);
            }}
            onInputChange={(name, value) => handleInputChange(name, value, rowIndex, column)}
          />
        );
      })}
      <EditIconCell mode={mode} onClick={() => onSelectedRow(rowData, rowIndex)} />
      {!disabledDeleted && (
        <DeleteIconCell mode={mode} onClick={() => onDeleteRow(rowData, rowIndex)} />
      )}
    </MUITableRow>
  );
});
export default TableRow;
