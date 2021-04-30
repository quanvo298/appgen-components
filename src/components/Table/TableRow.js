import React, { useEffect } from 'react';
import MUITableRow from '@material-ui/core/TableRow';
import { CellValue, EditIconCell, DeleteIconCell } from './TableCell';
import { TABLE_MODE } from '../../utils/constant';
import { useGridCtx } from './hooks/GridProvider';
import useGridRow from './hooks/useGridRow';

const TableRow = ({ classes, disabledDeleted, rowIndex, rowData, mode, errors = {} }) => {
  const { getEvents } = useGridCtx();
  const {
    onDeleteRow,
    onCellChange,
    onSelectedRow,
    onFormatCellValue,
    onRenderedRow,
  } = getEvents();
  const { getColumns } = useGridRow({ rowData, rowIndex });
  const columns = getColumns() || [];

  useEffect(() => {
    if (onRenderedRow) {
      onRenderedRow({ rowData, rowIndex });
    }
  }, [onRenderedRow]);

  return (
    <MUITableRow className={TABLE_MODE.View === mode ? classes.trEditor : ''} hover>
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
