"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _TableEditorHelper = require("../../helper/TableEditorHelper");

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Edit = _interopRequireDefault(require("@material-ui/icons/Edit"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _BasicElementForm = _interopRequireDefault(require("../BasicForm/BasicElementForm"));

var _constant = require("../../utils/constant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CellValue = function CellValue(_ref) {
  var row = _ref.row,
      column = _ref.column,
      _ref$overrideColumn = _ref.overrideColumn,
      overrideColumn = _ref$overrideColumn === void 0 ? {} : _ref$overrideColumn,
      mode = _ref.mode,
      forwardRef = _ref.forwardRef,
      onFormatCellValue = _ref.onFormatCellValue,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["row", "column", "overrideColumn", "mode", "forwardRef", "onFormatCellValue"]);
  return _constant.TABLE_MODE.Edit === mode ? _react.default.createElement(_TableCell.default, null, _react.default.createElement(_BasicElementForm.default, (0, _extends2.default)({}, column, overrideColumn, restProps, {
    value: row[column.name],
    supportFormControl: false,
    ref: forwardRef
  }))) : _react.default.createElement(_TableCell.default, null, (0, _TableEditorHelper.displayCellValue)(row, column, onFormatCellValue));
};

var EditIconCell = function EditIconCell(_ref2) {
  var mode = _ref2.mode,
      onClick = _ref2.onClick;
  return _constant.TABLE_MODE.View === mode && _react.default.createElement(_TableCell.default, {
    width: 16
  }, _react.default.createElement(_Edit.default, {
    onClick: onClick
  }));
};

var DeleteIconCell = function DeleteIconCell(_ref3) {
  var onClick = _ref3.onClick;
  return _react.default.createElement(_TableCell.default, {
    width: 16
  }, _react.default.createElement(_Delete.default, {
    onClick: onClick
  }));
};

var TableRow =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(TableRow, _Component);

  function TableRow(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, TableRow);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TableRow).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setError", function (elementName) {
      var ref = _this.elementFormRefs[elementName];
      ref.setError(true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addElementFormRef", function (elementFormRef) {
      if (elementFormRef) {
        var props = elementFormRef.props;
        _this.elementFormRefs[props.name] = elementFormRef;
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getCellDefinition", function (cellName) {
      var columns = _this.props.columns;
      return columns.find(function (column) {
        return column.name === cellName;
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "changeCellDefition", function (cellName, newCellDefinition) {
      var currentCellDefinition = _this.getCellDefinition(cellName);

      if (currentCellDefinition) {
        var changedCellDefinition = _objectSpread({}, currentCellDefinition, {}, newCellDefinition);

        _this.elementFormRefs[cellName].changeDefinition(changedCellDefinition);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleInputChange", function (cellName, value, rowIndex, column) {
      return function () {
        var rowData = _this.state.rowData;
        rowData[cellName] = value;

        _this.props.onInputChange(cellName, value, rowIndex, column);
      };
    });
    _this.elementFormRefs = {};
    _this.state = {
      rowData: undefined,
      rowIndex: -1,
      setFromState: false
    };
    return _this;
  }

  (0, _createClass2.default)(TableRow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          rowData = _this$state.rowData,
          rowIndex = _this$state.rowIndex;
      var _this$props = this.props,
          columns = _this$props.columns,
          classes = _this$props.classes,
          mode = _this$props.mode,
          onFormatCellValue = _this$props.onFormatCellValue,
          disabledDeleted = _this$props.disabledDeleted,
          onSelectedRow = _this$props.onSelectedRow,
          onDeleteRow = _this$props.onDeleteRow;
      return _react.default.createElement(_TableRow.default, {
        key: rowIndex,
        className: _constant.TABLE_MODE.View === mode ? classes.trEditor : '',
        hover: true
      }, columns.map(function (column, colIndex) {
        return _react.default.createElement(CellValue, {
          key: colIndex,
          row: rowData,
          column: column,
          mode: mode,
          onFormatCellValue: onFormatCellValue,
          forwardRef: function forwardRef(ref) {
            _this2.addElementFormRef(ref, rowIndex);
          },
          onInputChange: function onInputChange(name, value) {
            return _this2.handleInputChange(name, value, rowIndex, column);
          }
        });
      }), _react.default.createElement(EditIconCell, {
        mode: mode,
        onClick: function onClick() {
          return onSelectedRow(rowData, rowIndex);
        }
      }), !disabledDeleted && _react.default.createElement(DeleteIconCell, {
        mode: mode,
        onClick: function onClick() {
          return onDeleteRow(rowData, rowIndex);
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var rowDataFromState = state.rowData,
          rowIndexFromState = state.rowIndex,
          setFromState = state.setFromState;
      var rowDataFromProps = props.rowData,
          rowIndexFromProps = props.rowIndex;
      var shouldBeUpdated = setFromState || rowDataFromProps !== rowDataFromState || rowIndexFromProps !== rowIndexFromState;

      if (shouldBeUpdated) {
        var rowData = setFromState ? rowDataFromState : rowDataFromProps;
        var rowIndex = setFromState ? rowIndexFromState : rowIndexFromProps;
        return {
          rowData: rowData,
          rowIndex: rowIndex,
          setFromState: false
        };
      }

      return null;
    }
  }]);
  return TableRow;
}(_react.Component);

var _default = TableRow;
exports.default = _default;