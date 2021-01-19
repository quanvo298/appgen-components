import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTableStyles } from '../../utils/withBasicStyles';
import { usePolyglot } from '../../utils/LocaleProvider';
import Wrapper from '../Container/Wrapper';
import BasicButton from '../Button/BasicButton';
import { isNotEmpty } from '../../utils/CollectionUtils';
import Head from './Head';
import TableRow from './TableRow';
import useGrid from './hooks/useGrid';
import GridContext from './hooks/GridContext';
import GridProvider, { useGridCtx } from './hooks/GridProvider';
import { defaultFunc } from '../../utils/props';

export const GridEvents = {
  AddNewRow: 'AddNewRow',
  CellChange: 'CellChange',
  DeleteRow: 'DeleteRow',
};
const ButtonBox = ({ disabledNew, onAddNewRow }) => {
  const polyglot = usePolyglot();

  return (
    <Wrapper my={2} textAlign="end">
      {!disabledNew && (
        <BasicButton size="small" onClick={onAddNewRow}>
          {polyglot.t('btn.new')}
        </BasicButton>
      )}
    </Wrapper>
  );
};

const TableComponent = props => {
  const classes = useTableStyles();
  const { error, mode, disabledDeleted, disabledNew, columns, onChange = defaultFunc } = props;

  const { addGridEvents, onEventEmitters, getGridData, clearGridRows } = useGridCtx();

  const { addRow, deleteRow, setCellValue, validate, getErrors, setRowColumnDefs } = useGrid({
    mode,
    error,
  });

  const processChange = payload => {
    onChange({ target: { value: getGridData(), payload } });
  };

  const onAddNewRow = event => {
    event.preventDefault();
    event.stopPropagation();
    addRow();
    processChange({ sourceEvent: GridEvents.AddNewRow });
  };

  const onDeleteRow = rowIndex => {
    deleteRow(rowIndex);
  };

  const onCellChange = ({ cellName, cellValue, rowIndex, event }) => {
    setCellValue({ cellName, cellValue, rowIndex });
    processChange({
      sourceEvent: GridEvents.CellChange,
      body: { cellName, cellValue, rowIndex },
      event,
    });
  };

  const updateCellsDef = ({ cellsDef, rowIndex }) => {
    setRowColumnDefs({ rowIndex, columns: cellsDef });
  };

  addGridEvents({ onDeleteRow, onCellChange });
  onEventEmitters({ updateCellsDef, validate });

  const gridData = getGridData();
  const errors = getErrors();
  clearGridRows();

  return (
    <PerfectScrollbar>
      <Wrapper>
        <Table className={classes.table}>
          <Head columns={columns} classes={classes} mode={mode} />
          {isNotEmpty(gridData) && (
            <TableBody>
              {gridData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  rowIndex={rowIndex}
                  rowData={row}
                  classes={classes}
                  mode={mode}
                  disabledDeleted={disabledDeleted}
                  errors={errors[rowIndex]}
                />
              ))}
            </TableBody>
          )}
        </Table>
        <ButtonBox disabledNew={disabledNew} onAddNewRow={onAddNewRow} />
      </Wrapper>
    </PerfectScrollbar>
  );
};

const TableEditable = props => {
  const { columns, gridData, mode, onSelectedRow, onFormatCellValue } = props;
  const existedGridContext = useGridCtx();
  if (existedGridContext) {
    return <TableComponent {...props} />;
  }
  const gridContext = new GridContext({
    columns,
    gridData,
    mode,
    events: {
      onSelectedRow,
      onFormatCellValue,
    },
  });
  return (
    <GridProvider context={gridContext}>
      <TableComponent {...props} />
    </GridProvider>
  );
};

export default TableEditable;
