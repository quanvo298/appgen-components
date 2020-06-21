import React, { Component } from 'react';
import MUITableRow from '@material-ui/core/TableRow';
import { CellValue, EditIconCell, DeleteIconCell } from './TableCell';
import { TABLE_MODE } from '../../utils/constant';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.elementFormRefs = {};
    this.state = {
      rowData: undefined,
      rowIndex: -1,
      setFromState: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { rowData: rowDataFromState, rowIndex: rowIndexFromState, setFromState } = state;
    const { rowData: rowDataFromProps, rowIndex: rowIndexFromProps } = props;
    const shouldBeUpdated =
      setFromState ||
      rowDataFromProps !== rowDataFromState ||
      rowIndexFromProps !== rowIndexFromState;
    if (shouldBeUpdated) {
      const rowData = setFromState ? rowDataFromState : rowDataFromProps;
      const rowIndex = setFromState ? rowIndexFromState : rowIndexFromProps;
      return {
        rowData,
        rowIndex,
        setFromState: false,
      };
    }
    return null;
  }

  setError = elementName => {
    const ref = this.elementFormRefs[elementName];
    ref.setError(true);
  };

  addElementFormRef = elementFormRef => {
    if (elementFormRef) {
      const { props } = elementFormRef;
      this.elementFormRefs[props.name] = elementFormRef;
    }
  };

  getCellDefinition = (cellName, rowIndex, column) => {
    const { onGetCellDefinition } = this.props;
    return onGetCellDefinition && onGetCellDefinition(cellName, rowIndex, column);
  };

  changeCellDefinition = (cellName, newCellDefinition) => {
    const { columns } = this.props;
    const currentCellDefinition = columns.find(({ name }) => name === cellName);

    if (currentCellDefinition) {
      const changedCellDefinition = { ...currentCellDefinition, ...newCellDefinition, label: '' };
      this.elementFormRefs[cellName].changeDefinition(changedCellDefinition);
    }
  };

  handleInputChange = (cellName, value, rowIndex, column) => () => {
    const { rowData } = this.state;
    rowData[cellName] = value;
    this.props.onChange(cellName, value, rowIndex, column);
  };

  render() {
    const { rowData, rowIndex } = this.state;
    const {
      columns,
      classes,
      mode,
      onFormatCellValue,
      disabledDeleted,
      onSelectedRow,
      onDeleteRow,
    } = this.props;
    return (
      <MUITableRow
        key={rowIndex}
        className={TABLE_MODE.View === mode ? classes.trEditor : ''}
        hover
      >
        {columns.map((column, colIndex) => (
          <CellValue
            key={colIndex}
            row={rowData}
            column={column}
            overrideColumn={this.getCellDefinition(column.name, rowIndex, column)}
            mode={mode}
            onFormatCellValue={onFormatCellValue}
            forwardRef={ref => {
              this.addElementFormRef(ref, rowIndex);
            }}
            onInputChange={(name, value) => this.handleInputChange(name, value, rowIndex, column)}
          />
        ))}
        <EditIconCell mode={mode} onClick={() => onSelectedRow(rowData, rowIndex)} />
        {!disabledDeleted && (
          <DeleteIconCell mode={mode} onClick={() => onDeleteRow(rowData, rowIndex)} />
        )}
      </MUITableRow>
    );
  }
}
export default TableRow;
