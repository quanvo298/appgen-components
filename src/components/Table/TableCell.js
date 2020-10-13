import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { displayCellValue } from '../../helper/TableEditorHelper';
import BasicElementForm from '../BasicForm/BasicElementForm';
import { TABLE_MODE } from '../../utils/constant';

export const CellValue = ({
  row,
  column = {},
  overrideColumn = {},
  mode,
  forwardRef,
  onFormatCellValue,
  ...restProps
}) => {
  const cellValue = row[column.name] || overrideColumn.defaultValue || column.defaultValue;
  return TABLE_MODE.Edit === mode ? (
    <TableCell>
      <BasicElementForm
        {...column}
        {...overrideColumn}
        {...restProps}
        variant={null}
        label=""
        value={cellValue}
        ref={forwardRef}
      />
    </TableCell>
  ) : (
    <TableCell>{displayCellValue(row, column, onFormatCellValue)}</TableCell>
  );
};
export const EditIconCell = ({ mode, onClick }) =>
  TABLE_MODE.View === mode && (
    <TableCell width={24}>
      <EditIcon onClick={onClick} size={24} />
    </TableCell>
  );

export const DeleteIconCell = ({ onClick }) => (
  <TableCell width={24}>
    <DeleteIcon onClick={onClick} size={24} />
  </TableCell>
);

export default CellValue;
