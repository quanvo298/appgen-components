"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _TableEditable = _interopRequireDefault(require("../TableEditor/TableEditable"));

var _BasicEditor = _interopRequireDefault(require("../ElementFormEditor/BasicEditor"));

var _constant = require("../../utils/constant");

var GridComponent = function GridComponent(_ref) {
  var component = _ref.component,
      name = _ref.name,
      value = _ref.value,
      onInputChange = _ref.onInputChange,
      forwardRef = _ref.forwardRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["component", "name", "value", "onInputChange", "forwardRef"]);
  return _react.default.createElement(_TableEditable.default, (0, _extends2.default)({}, component, {
    mode: _constant.TABLE_MODE.Edit,
    gridData: value,
    componentName: name,
    disabledDeleted: component.disabledDeleted,
    disabledNew: component.disabledNew,
    onChange: onInputChange && onInputChange(name),
    ref: forwardRef
  }, restProps));
};

var ElementTagBaseOnComponent = _react.default.forwardRef(function (props, ref) {
  switch (props.component.type) {
    case 'grid':
      return _react.default.createElement(GridComponent, (0, _extends2.default)({}, props, {
        forwardRef: ref
      }));

    default:
      return _react.default.createElement(_BasicEditor.default, props);
  }
});

var ElementFormEditor = function ElementFormEditor(_ref2) {
  var forwardedRef = _ref2.forwardedRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, ["forwardedRef"]);
  return restProps.component ? _react.default.createElement(ElementTagBaseOnComponent, (0, _extends2.default)({
    ref: forwardedRef
  }, restProps)) : _react.default.createElement(_BasicEditor.default, restProps);
};

var _default = ElementFormEditor;
exports.default = _default;