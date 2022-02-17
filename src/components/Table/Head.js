import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { isNotEmpty } from '../../utils/CollectionUtils';
import { TABLE_MODE } from '../../utils/constant';

const MIN_WIDTH = 120;
const ICON_WIDTH = 16;

const Head = ({ columns = [], classes, mode, ordered }) => (
  <TableHead>
    <TableRow className={mode === TABLE_MODE.View ? classes.trEditor : classes.trDefault}>
      {ordered && <TableCell />}
      {columns.map((column, index) => (
        <TableCell key={index} width={column.width ? Number(column.width) : MIN_WIDTH}>
          {column.label}
        </TableCell>
      ))}
      {mode === TABLE_MODE.View && isNotEmpty(columns) && <TableCell width={ICON_WIDTH} />}
    </TableRow>
  </TableHead>
);
export default Head;
