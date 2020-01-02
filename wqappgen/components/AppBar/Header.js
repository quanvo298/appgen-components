"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Toolbar = _interopRequireDefault(require("@material-ui/core/Toolbar"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _AppBar = _interopRequireDefault(require("./AppBar"));

var _withPolyglot = _interopRequireDefault(require("../../utils/withPolyglot"));

var Header = function Header(_ref) {
  var polyglot = _ref.polyglot;
  return _react.default.createElement(_AppBar.default, null, _react.default.createElement(_Toolbar.default, null, _react.default.createElement(_Typography.default, {
    variant: "h6",
    color: "inherit"
  }, polyglot.t('app.title'))));
};

var _default = (0, _withPolyglot.default)(Header);

exports.default = _default;