import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTableStyles } from '../../utils/withBasicStyles';
import { usePolyglot } from '../../utils/LocaleProvider';
import { validate as tableValidate, processErrors } from '../../helper/TableEditorHelper';
import Wrapper from '../Container/Wrapper';
import BasicButton from '../Button/BasicButton';
import { isNotEmpty } from '../../utils/CollectionUtils';
import { processInitialValues } from '../../helper/BasicFormHelper';
import Head from './Head';
import TableRow from './TableRow';
import useGetSetRef from '../../hooks/useGetSetRef';
import { assignToRef } from '../../utils';
import { defaultFunc } from '../../utils/props';

const ButtonsBox = ({ disabledNew, onAddNewRow }) => {
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

const TableEditable = React.forwardRef((props, ref) => {
  const classes = useTableStyles();
  const {
    gridData: propGridData = {},
    mode,
    disabledDeleted,
    disabledNew,
    columns,
    onFormatCellValue,
    onChange: propChange = defaultFunc,
    onSelectedRow: propSelectedRow = defaultFunc,
    onCellChange = defaultFunc,
    onGetCellDefinition = defaultFunc,
    componentName,
  } = props;

  const {
    get: getRowRefs,
    setProp: setRowRef,
    getProp: getRowRef,
    removeProp: removeRowRef,
  } = useGetSetRef([]);
  const [gridData, setGridData] = useState(propGridData.value);

  useEffect(() => {
    setGridData(propGridData.value);
  }, [propGridData]);

  const addRowRef = (elementFormRef, rowIndexed) => {
    if (elementFormRef) {
      setRowRef(rowIndexed, elementFormRef);
    }
  };

  const validate = () => {
    if (gridData && gridData.length) {
      const { hasError, errors } = tableValidate(gridData, columns);
      if (hasError) {
        processErrors(getRowRefs(), errors);
      }
      return !hasError;
    }
    return false;
  };

  const onChange = () => {
    const event = { target: { value: gridData, ref } };
    propChange(event);
  };

  const onDeleteRow = (rowData, rowIndex) => {
    if (gridData) {
      removeRowRef(rowIndex);
      gridData.splice(rowIndex, 1);
      setGridData([...gridData]);
      onChange();
    }
  };

  const onAddNewRow = event => {
    event.preventDefault();
    event.stopPropagation();
    const data = gridData || [];
    const initialValues = processInitialValues(columns);
    data.push(initialValues);
    setGridData([...data]);
    onChange();
  };

  const onSelectedRow = (row, rowIndex) => {
    propSelectedRow(row, rowIndex);
  };

  const changeCellDefinition = (cellName, rowIndexed, newCellDefinition) => {
    getRowRef(rowIndexed).changeCellDefinition(cellName, newCellDefinition);
  };

  const handleCellChange = (cellName, value, rowIndexed) => {
    const rowData = gridData[rowIndexed];
    const { current } = ref;
    const event = { target: { value: gridData, ref: current } };
    rowData[cellName] = value;
    onCellChange({
      propertyName: componentName,
      cellName,
      cellValue: value,
      rowIndexed,
      gridData,
      event,
    });

    onChange();
  };

  const handleGetCellDefinition = (cellName, rowIndexed) => {
    onGetCellDefinition({
      propertyName: componentName,
      cellName,
      rowIndexed,
    });
  };

  assignToRef(ref, {
    validate,
    changeCellDefinition,
  });

  return (
    <PerfectScrollbar>
      <Wrapper>
        <Table className={classes.table}>
          <Head columns={columns} classes={classes} mode={mode} />
          {isNotEmpty(gridData) && (
            <TableBody>
              {gridData.map((row, rowIndex) => (
                <TableRow
                  mode={mode}
                  columns={columns}
                  key={row.id || rowIndex}
                  rowData={row}
                  rowIndex={rowIndex}
                  classes={classes}
                  onFormatCellValue={onFormatCellValue}
                  onGetCellDefinition={handleGetCellDefinition}
                  onChange={handleCellChange}
                  disabledDeleted={disabledDeleted}
                  onDeleteRow={onDeleteRow}
                  onSelectedRow={onSelectedRow}
                  ref={rowRef => {
                    addRowRef(rowRef, rowIndex);
                  }}
                />
              ))}
            </TableBody>
          )}
        </Table>
        <ButtonsBox disabledNew={disabledNew} onAddNewRow={onAddNewRow} />
      </Wrapper>
    </PerfectScrollbar>
  );
});

export default TableEditable;
