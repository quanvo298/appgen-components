"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _TableEditorHelper = require("../../helper/TableEditorHelper");

var _Head = _interopRequireDefault(require("./Head"));

var TableView = function TableView(_ref) {
  var columns = _ref.columns,
      gridData = _ref.gridData,
      classes = _ref.classes;
  return _react.default.createElement(_Wrapper.default, null, _react.default.createElement(_Table.default, {
    className: classes.table
  }, _react.default.createElement(_Head.default, {
    columns: columns,
    classes: classes,
    mode: ""
  }), _react.default.createElement(_TableBody.default, null, gridData && gridData.map(function (row, index) {
    return _react.default.createElement(_TableRow.default, {
      key: index,
      className: classes.trEditor,
      hover: true
    }, columns.map(function (column, colIndex) {
      return _react.default.createElement(_TableCell.default, {
        key: colIndex
      }, (0, _TableEditorHelper.displayCellValue)(row, column));
    }));
  }))));
};

var _default = (0, _withBasicStyles.withTableStyles)(TableView);

exports.default = _default;