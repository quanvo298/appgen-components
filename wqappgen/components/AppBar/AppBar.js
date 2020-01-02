"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _AppBar = _interopRequireDefault(require("@material-ui/core/AppBar"));

var AppBarWrapper = function AppBarWrapper(props) {
  return _react.default.createElement(_AppBar.default, (0, _extends2.default)({
    component: "div",
    color: "primary",
    position: "static",
    elevation: 0
  }, props));
};

var _default = AppBarWrapper;
exports.default = _default;