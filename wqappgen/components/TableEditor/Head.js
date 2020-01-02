"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _CollectionUtils = require("../../utils/CollectionUtils");

var MIN_WIDTH = 100;
var ICON_WIDTH = 16;

var Head = function Head(_ref) {
  var columns = _ref.columns,
      classes = _ref.classes,
      mode = _ref.mode;
  return _react.default.createElement(_TableHead.default, null, _react.default.createElement(_TableRow.default, {
    className: mode === 'view' ? classes.trEditor : ''
  }, columns.map(function (column, index) {
    return _react.default.createElement(_TableCell.default, {
      key: index,
      width: column.width ? Number(column.width) : MIN_WIDTH
    }, column.label);
  }), mode === 'view' && (0, _CollectionUtils.isNotEmpty)(columns) && _react.default.createElement(_TableCell.default, {
    width: ICON_WIDTH
  })));
};

var _default = Head;
exports.default = _default;