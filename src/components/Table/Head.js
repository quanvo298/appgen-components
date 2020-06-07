import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { isNotEmpty } from '../../utils/CollectionUtils';

const MIN_WIDTH = 120;
const ICON_WIDTH = 16;

const Head = ({ columns, classes, mode }) => (
  <TableHead>
    <TableRow className={mode === 'view' ? classes.trEditor : ''}>
      {columns.map((column, index) => (
        <TableCell key={index} width={column.width ? Number(column.width) : MIN_WIDTH}>
          {column.label}
        </TableCell>
      ))}
      {mode === 'view' && isNotEmpty(columns) && <TableCell width={ICON_WIDTH} />}
    </TableRow>
  </TableHead>
);
export default Head;
