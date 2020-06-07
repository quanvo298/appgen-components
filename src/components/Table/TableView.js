import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withTableStyles } from '../../utils/withBasicStyles';
import Wrapper from '../Container/Wrapper';
import { displayCellValue } from '../../helper/TableEditorHelper';
import Head from './Head';

const TableView = ({ columns, gridData, classes }) => (
  <Wrapper>
    <Table className={classes.table}>
      <Head columns={columns} classes={classes} mode="" />
      <TableBody>
        {gridData &&
          gridData.map((row, index) => (
            <TableRow key={index} className={classes.trEditor} hover>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{displayCellValue(row, column)}</TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </Wrapper>
);
export default withTableStyles(TableView);
