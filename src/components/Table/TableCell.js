import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { displayCellValue } from '../../helper/TableEditorHelper';
import { TABLE_MODE } from '../../utils/constant';
import FieldForm from '../Form/FieldForm';
import { Row, Wrapper } from '../index';

export const CellValue = ({
  row,
  column = {},
  mode,
  cellValue,
  onFormatCellValue,
  onCellChange,
  rowIndex,
  error,
}) => {
  const cellChange = (cellName, value) => event => {
    onCellChange({ cellName, cellValue: value, rowIndex, event });
  };

  return TABLE_MODE.Edit === mode ? (
    <TableCell>
      <FieldForm
        {...column}
        variant={null}
        label=""
        value={{ value: cellValue }}
        error={error}
        onFieldChange={cellChange}
      />
    </TableCell>
  ) : (
    <TableCell>{displayCellValue(row, column, rowIndex, onFormatCellValue)}</TableCell>
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

export const ArrowMoveIconCell = ({ firstRow, lastRow, moveUp, moveDown }) => (
  <TableCell padding="none">
    <Row>
      {!firstRow ? <ArrowDropUp onClick={moveUp} /> : <Wrapper width={24} />}
      {!lastRow && <ArrowDropDown onClick={moveDown} />}
    </Row>
  </TableCell>
);

export default CellValue;
