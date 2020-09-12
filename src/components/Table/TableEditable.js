import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withTableStyles } from '../../utils/withBasicStyles';
import { usePolyglot } from '../../utils/LocaleProvider';
import { validate, processErrors } from '../../helper/TableEditorHelper';
import Wrapper from '../Container/Wrapper';
import BasicButton from '../Button/BasicButton';
import { isNotEmpty } from '../../utils/CollectionUtils';
import { processInitialValues } from '../../helper/BasicFormHelper';
import Head from './Head';
import TableRow from './TableRow';

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

class TableEditable extends Component {
  constructor(props) {
    super(props);
    this.rowRefs = [];
    this.state = {
      gridData: undefined,
      setFromState: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { gridData: gridDataFromState, setFromState } = state;
    const { gridData: gridDataFromProps } = props;
    const shouldBeUpdated = setFromState || gridDataFromState !== gridDataFromProps;
    if (shouldBeUpdated) {
      const gridData = setFromState ? gridDataFromState : gridDataFromProps;
      return {
        gridData,
        setFromState: false,
      };
    }
    return null;
  }

  addRowRef = (elementFormRef, rowIndexed) => {
    if (elementFormRef) {
      this.rowRefs[rowIndexed] = elementFormRef;
    }
  };

  getRowRef = rowIndexed => this.rowRefs[rowIndexed];

  validate = () => {
    const { columns } = this.props;
    const { gridData } = this.state;
    if (gridData.length) {
      const { hasError, errors } = validate(gridData, columns);
      if (hasError) {
        processErrors(this.rowRefs, errors);
      }
      return !hasError;
    }
    return false;
  };

  onDeleteRow = (rowData, rowIndex) => {
    const { gridData } = this.state;
    if (gridData) {
      this.rowRefs.splice(rowIndex, 1);
      gridData.splice(rowIndex, 1);
      this.setState({ gridData, setFromState: true });
    }
  };

  onAddNewRow = event => {
    event.preventDefault();
    event.stopPropagation();
    let { gridData } = this.state;
    if (!gridData) {
      gridData = [];
    }
    const { columns } = this.props;
    const initialValues = processInitialValues(columns);
    gridData.push(initialValues);
    this.setState({ gridData, setFromState: true });
  };

  onSelectedRow = (row, rowIndex) => {
    const { onSelectedRow } = this.props;
    if (onSelectedRow) {
      onSelectedRow(row, rowIndex);
    }
  };

  changeCellDefinition = (cellName, rowIndexed, newCellDefinition) => {
    const rowRef = this.rowRefs[rowIndexed];
    rowRef.changeCellDefinition(cellName, newCellDefinition);
  };

  handleChange = (cellName, value, rowIndexed) => {
    const { gridData } = this.state;
    const { onCellChange, onChange, componentName } = this.props;
    const rowData = gridData[rowIndexed];
    const event = { target: { value: gridData, ref: this } };
    rowData[cellName] = value;
    if (onCellChange) {
      onCellChange({
        propertyName: componentName,
        cellName,
        cellValue: value,
        rowIndexed,
        gridData,
        event,
      });
    }
    if (onChange) {
      onChange(event);
    }
  };

  handleGetCellDefinition = (cellName, rowIndexed) => {
    const { onGetCellDefinition, componentName } = this.props;

    return (
      onGetCellDefinition &&
      onGetCellDefinition({
        propertyName: componentName,
        cellName,
        rowIndexed,
      })
    );
  };

  render() {
    const { gridData } = this.state;
    const {
      columns,
      classes,
      mode,
      disabledNew,
      disabledDeleted,
      onFormatCellValue,
      inputProps = {},
    } = this.props;
    const { disabled, inputRef, onAnimationStart } = inputProps;

    return (
      <PerfectScrollbar>
        <Wrapper
          minWidth={1050}
          ref={inputRef}
          disabled={disabled}
          // onFocus={onFocus}
          // onBlur={onBlur}
          onAnimationStart={onAnimationStart}
        >
          <Table className={classes.table}>
            <Head columns={columns} classes={classes} mode={mode} />
            {isNotEmpty(gridData) && (
              <TableBody>
                {gridData.map((row, rowIndex) => (
                  <TableRow
                    mode={mode}
                    columns={columns}
                    key={rowIndex}
                    rowData={row}
                    rowIndex={rowIndex}
                    classes={classes}
                    onFormatCellValue={onFormatCellValue}
                    onGetCellDefinition={this.handleGetCellDefinition}
                    onChange={this.handleChange}
                    disabledDeleted={disabledDeleted}
                    onDeleteRow={this.onDeleteRow}
                    onSelectedRow={this.onSelectedRow}
                    ref={ref => {
                      this.addRowRef(ref, rowIndex);
                    }}
                  />
                ))}
              </TableBody>
            )}
          </Table>
          <ButtonsBox disabledNew={disabledNew} onAddNewRow={this.onAddNewRow} />
        </Wrapper>
      </PerfectScrollbar>
    );
  }
}
export default withTableStyles(TableEditable);