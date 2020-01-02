"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _LocalProvider = require("../../utils/LocalProvider");

var _ToolbarButton = _interopRequireDefault(require("../Toolbar/ToolbarButton"));

var _BasicElementForm = _interopRequireDefault(require("./BasicElementForm"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var ButtonsBox = function ButtonsBox(_ref) {
  var supportSave = _ref.supportSave,
      supportReset = _ref.supportReset,
      onSave = _ref.onSave,
      onReset = _ref.onReset,
      toolbarButtons = _ref.toolbarButtons;
  var polyglot = (0, _LocalProvider.usePolyglot)();
  var cloneToolbarButtons = [];

  if (toolbarButtons) {
    cloneToolbarButtons = [].concat((0, _toConsumableArray2.default)(cloneToolbarButtons), (0, _toConsumableArray2.default)(toolbarButtons));
  }

  if (supportSave) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.save'),
      onClick: onSave
    });
  }

  if (supportReset) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.reset'),
      onClick: onReset,
      color: 'default'
    });
  }

  return _react.default.createElement(_ToolbarButton.default, {
    toolbarButtons: cloneToolbarButtons
  });
};

var BasicFormLayout = function BasicFormLayout(_ref2) {
  var elements = _ref2.elements,
      elementsValue = _ref2.elementsValue,
      classes = _ref2.classes,
      doSave = _ref2.doSave,
      onSave = _ref2.onSave,
      doReset = _ref2.doReset,
      onReset = _ref2.onReset,
      forwardRef = _ref2.forwardRef,
      formToolbarButton = _ref2.formToolbarButton,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, ["elements", "elementsValue", "classes", "doSave", "onSave", "doReset", "onReset", "forwardRef", "formToolbarButton"]);
  return _react.default.createElement(_Wrapper.default, null, _react.default.createElement(_Wrapper.default, null, elements && elements.map(function (element, index) {
    return _react.default.createElement(_BasicElementForm.default, (0, _extends2.default)({
      ref: forwardRef,
      key: index
    }, element, restProps, {
      value: elementsValue[element.name]
    }));
  })), _react.default.createElement(_Wrapper.default, {
    className: classes.menuWrapper
  }, _react.default.createElement(ButtonsBox, {
    supportSave: doSave,
    supportReset: doReset,
    onSave: onSave,
    onReset: onReset,
    toolbarButtons: formToolbarButton
  })));
};

var _default = BasicFormLayout;
exports.default = _default;