import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { displayCellValue } from '../../helper/TableEditorHelper';
import BasicElementForm from '../BasicForm/BasicElementForm';

export const CellValue = ({
  row,
  column,
  overrideColumn = {},
  mode,
  forwardRef,
  onFormatCellValue,
  ...restProps
}) =>
  TABLE_MODE.Edit === mode ? (
    <TableCell>
      <BasicElementForm
        {...column}
        {...overrideColumn}
        {...restProps}
        value={row[column.name]}
        supportFormControl={false}
        ref={forwardRef}
      />
    </TableCell>
  ) : (
    <TableCell>{displayCellValue(row, column, onFormatCellValue)}</TableCell>
  );

export const EditIconCell = ({ mode, onClick }) =>
  TABLE_MODE.View === mode && (
    <TableCell width={16}>
      <EditIcon onClick={onClick} />
    </TableCell>
  );

export const DeleteIconCell = ({ onClick }) => (
  <TableCell width={16}>
    <DeleteIcon onClick={onClick} />
  </TableCell>
);

export default CellValue;
