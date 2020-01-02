"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _rebass = require("rebass");

var Row = function Row(props) {
  return _react.default.createElement(_rebass.Flex, (0, _extends2.default)({
    flexWrap: "wrap"
  }, props, {
    flexDirection: "row"
  }));
};

var _default = Row;
exports.default = _default;