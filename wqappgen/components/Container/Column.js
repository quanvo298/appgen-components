"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _rebass = require("rebass");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledSystem = require("styled-system");

var ColumnStyle = (0, _styledComponents.default)(_rebass.Box).withConfig({
  displayName: "Column__ColumnStyle",
  componentId: "sc-13dcv3a-0"
})(["", " ", ""], _styledSystem.justifyContent, _styledSystem.display);

var Column = function Column(props) {
  return _react.default.createElement(ColumnStyle, (0, _extends2.default)({
    px: 3,
    flex: "1 1 auto"
  }, props));
};

var _default = Column;
exports.default = _default;