"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _AutoSelect = _interopRequireDefault(require("../AutoSelect/AutoSelect"));

var _config = require("../config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var processSelectComponent = function processSelectComponent(props) {
  if (props.type === 'boolean') {
    return _react.default.createElement(_Select.default, {
      native: true,
      fullWidth: true,
      error: props.error,
      value: props.value,
      onChange: props.onInputChange && props.onInputChange(props.name)
    }, _react.default.createElement("option", {
      value: ""
    }), _config.TrueOrFalseOptions.map(function (option, index) {
      return _react.default.createElement("option", {
        value: option.value,
        key: index
      }, option.label);
    }));
  }

  return _react.default.createElement(_Select.default, {
    native: true,
    fullWidth: true,
    error: props.error,
    value: props.value,
    onChange: props.onInputChange && props.onInputChange(props.name)
  }, props.component.optionEmpty && _react.default.createElement("option", {
    value: ""
  }), props.component.data.map(function (option, index) {
    return _react.default.createElement("option", {
      value: option.value,
      key: index
    }, option.label);
  }));
};

var processAutoSelectComponent = function processAutoSelectComponent(props) {
  return _react.default.createElement(_AutoSelect.default, {
    error: props.error,
    value: props.value,
    component: props.component,
    onChange: props.onInputChange && props.onInputChange(props.name)
  });
};

var processBooleanType = function processBooleanType(props) {
  return _react.default.createElement(_Checkbox.default, {
    checked: props.value,
    onChange: props.onInputChange && props.onInputChange(props.name, 'checked'),
    value: "true"
  });
};

var processOtherType = function processOtherType(_ref) {
  var name = _ref.name,
      value = _ref.value,
      type = _ref.type,
      error = _ref.error,
      disabled = _ref.disabled,
      _ref$inputProps = _ref.inputProps,
      inputProps = _ref$inputProps === void 0 ? {} : _ref$inputProps,
      _ref$elementProps = _ref.elementProps,
      elementProps = _ref$elementProps === void 0 ? {} : _ref$elementProps,
      onInputChange = _ref.onInputChange,
      onKeyPress = _ref.onKeyPress;
  return _react.default.createElement(_TextField.default, {
    fullWidth: true,
    error: error,
    InputLabelProps: _objectSpread({
      shrink: true
    }, elementProps),
    onChange: onInputChange && onInputChange(name),
    onKeyPress: onKeyPress && onKeyPress(name),
    value: value || '',
    type: type,
    disabled: disabled,
    InputProps: _objectSpread({}, inputProps)
  });
};

var ElementTagBaseOnType = function ElementTagBaseOnType(props) {
  switch (props.type) {
    case 'boolean':
      return processBooleanType(props);

    default:
      return processOtherType(props);
  }
};

var ElementTagBaseOnComponent = function ElementTagBaseOnComponent(props) {
  switch (props.component.type) {
    case 'select':
      return processSelectComponent(props);

    case 'auto-select':
      return processAutoSelectComponent(props);

    default:
      return _react.default.createElement(_react.default.Fragment, null, " ");
  }
};

var _default = function _default(props) {
  return props.component ? _react.default.createElement(ElementTagBaseOnComponent, props) : _react.default.createElement(ElementTagBaseOnType, props);
};

exports.default = _default;