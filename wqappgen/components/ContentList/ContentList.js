"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _TableEditable = _interopRequireDefault(require("../TableEditor/TableEditable"));

var _BasicBoxWidget = _interopRequireDefault(require("../BasicBoxWidget/BasicBoxWidget"));

var ContentList = function ContentList(_ref) {
  var title = _ref.title,
      init = _ref.init,
      gridData = _ref.gridData;
  return _react.default.createElement(_BasicBoxWidget.default, {
    title: title
  }, _react.default.createElement(_TableEditable.default, (0, _extends2.default)({
    disabledNew: true
  }, init, {
    mode: "view",
    width: 1,
    gridData: gridData
  })));
};

var _default = ContentList;
exports.default = _default;