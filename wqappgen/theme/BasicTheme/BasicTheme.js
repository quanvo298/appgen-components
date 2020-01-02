"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var _Wrapper = _interopRequireDefault(require("../../components/Container/Wrapper"));

var _Header = _interopRequireDefault(require("../../components/AppBar/Header"));

var _NavBar = _interopRequireDefault(require("./NavBar"));

var BasicThemeWidget = function BasicThemeWidget(_ref) {
  var classes = _ref.classes,
      navigation = _ref.navigation,
      children = _ref.children;
  return _react.default.createElement(_Wrapper.default, {
    className: classes.root
  }, _react.default.createElement("nav", {
    className: classes.drawer
  }, _react.default.createElement(_NavBar.default, navigation)), _react.default.createElement(_Wrapper.default, {
    className: classes.appContent
  }, _react.default.createElement(_Header.default, null), _react.default.createElement(_Wrapper.default, {
    className: classes.appPageContent
  }, children)));
};

var BasicTheme = (0, _withBasicStyles.withLayoutStyles)(BasicThemeWidget);
var _default = BasicTheme;
exports.default = _default;