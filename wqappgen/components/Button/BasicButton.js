"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var BasicButton = function BasicButton(_ref) {
  var classes = _ref.classes,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["classes"]);
  return _react.default.createElement(_Button.default, (0, _extends2.default)({
    variant: "contained",
    color: "primary",
    className: classes.addButton
  }, restProps));
};

var _default = (0, _withBasicStyles.withButtonStyles)(BasicButton);

exports.default = _default;