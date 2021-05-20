import React, { useEffect } from 'react';
import MUITableRow from '@material-ui/core/TableRow';
import { CellValue, EditIconCell, DeleteIconCell, ArrowMoveIconCell } from './TableCell';
import { TABLE_MODE } from '../../utils/constant';
import { useGridCtx } from './hooks/GridProvider';
import useGridRow from './hooks/useGridRow';

const TableRow = ({
  classes,
  disabledDeleted: propDisabledDeleted,
  rowIndex,
  mode,
  errors = {},
}) => {
  const {
    getEvents,
    supportOrdered,
    getRowsNo,
    getGridRowData,
    getOrderedColumnName,
  } = useGridCtx();
  const {
    onDeleteRow,
    onCellChange,
    onSelectedRow,
    onFormatCellValue,
    onRenderedRow,
  } = getEvents();
  const rowData = getGridRowData(rowIndex);
  const { getColumns, getRowConfig, moveUp, moveDown } = useGridRow({
    rowData,
    rowIndex,
  });
  const columns = getColumns() || [];

  useEffect(() => {
    if (onRenderedRow) {
      onRenderedRow({ rowData, rowIndex });
    }
  }, [onRenderedRow]);

  const handleMoveUp = () => {
    moveUp();
    onCellChange({ cellName: getOrderedColumnName(), rowIndex, cellValue: rowIndex });
  };

  const handleMoveDown = () => {
    moveDown();
    onCellChange({ cellName: getOrderedColumnName(), rowIndex, cellValue: rowIndex });
  };

  const { disabledDeleted } = getRowConfig({ disabledDeleted: propDisabledDeleted });
  const ordered = supportOrdered();

  return (
    <MUITableRow className={TABLE_MODE.View === mode ? classes.trEditor : classes.trDefault} hover>
      {ordered && (
        <ArrowMoveIconCell
          moveUp={handleMoveUp}
          moveDown={handleMoveDown}
          firstRow={rowIndex === 0}
          lastRow={rowIndex === getRowsNo() - 1}
        />
      )}
      {columns.map(column => {
        const { name: columnName } = column;
        const key = columnName;
        const cellValue = rowData[columnName];
        return (
          <CellValue
            rowIndex={rowIndex}
            key={key}
            row={rowData}
            column={column}
            mode={mode}
            cellValue={cellValue}
            error={errors[columnName]}
            onCellChange={onCellChange}
            onFormatCellValue={onFormatCellValue}
          />
        );
      })}
      <EditIconCell mode={mode} onClick={() => onSelectedRow(rowData, rowIndex)} />
      {!disabledDeleted && <DeleteIconCell mode={mode} onClick={() => onDeleteRow(rowIndex)} />}
    </MUITableRow>
  );
};
export default TableRow;
