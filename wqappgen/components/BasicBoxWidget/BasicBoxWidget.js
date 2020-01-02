"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _AppBar = _interopRequireDefault(require("../AppBar/AppBar"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var BasicBoxWidget = function BasicBoxWidget(_ref) {
  var title = _ref.title,
      buttonsBox = _ref.buttonsBox,
      classes = _ref.classes,
      children = _ref.children;
  return _react.default.createElement(_Paper.default, {
    className: classes.paper
  }, _react.default.createElement(_AppBar.default, {
    color: "default"
  }, _react.default.createElement(_Toolbar.default, null, _react.default.createElement(_Grid.default, {
    container: true,
    spacing: 2,
    alignItems: "center"
  }, _react.default.createElement(_Grid.default, {
    item: true,
    xs: true
  }, _react.default.createElement(_Typography.default, {
    variant: "h6"
  }, title)), buttonsBox))), _react.default.createElement(_Wrapper.default, {
    className: classes.contentWrapper
  }, children));
};

var _default = (0, _withBasicStyles.withBasicFormStyles)(BasicBoxWidget);

exports.default = _default;