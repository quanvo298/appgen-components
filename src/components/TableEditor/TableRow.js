import React, { Component } from 'react';
import { displayCellValue } from 'helper/TableEditorHelper';
import TableCell from '@material-ui/core/TableCell';
import TableRowMaterial from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BasicElementForm from 'components/BasicForm/BasicElementForm';
import { TABLE_MODE } from 'utils/constant';

const CellValue = ({
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

const EditIconCell = ({ mode, onClick }) =>
  TABLE_MODE.View === mode && (
    <TableCell width={16}>
      <EditIcon onClick={onClick} />
    </TableCell>
  );

const DeleteIconCell = ({ onClick }) => (
  <TableCell width={16}>
    <DeleteIcon onClick={onClick} />
  </TableCell>
);
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

  getCellDefinition = cellName => {
    const { columns } = this.props;
    return columns.find(column => column.name === cellName);
  };

  changeCellDefition = (cellName, newCellDefinition) => {
    const currentCellDefinition = this.getCellDefinition(cellName);
    if (currentCellDefinition) {
      const changedCellDefinition = { ...currentCellDefinition, ...newCellDefinition };
      this.elementFormRefs[cellName].changeDefinition(changedCellDefinition);
    }
  };

  handleInputChange = (cellName, value, rowIndex, column) => () => {
    const { rowData } = this.state;
    rowData[cellName] = value;
    this.props.onInputChange(cellName, value, rowIndex, column);
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
      <TableRowMaterial
        key={rowIndex}
        className={TABLE_MODE.View === mode ? classes.trEditor : ''}
        hover
      >
        {columns.map((column, colIndex) => (
          <CellValue
            key={colIndex}
            row={rowData}
            column={column}
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
      </TableRowMaterial>
    );
  }
}
export default TableRow;
