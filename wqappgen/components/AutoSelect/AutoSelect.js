"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactSelect = _interopRequireDefault(require("react-select"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _NoSsr = _interopRequireDefault(require("@material-ui/core/NoSsr"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _Cancel = _interopRequireDefault(require("@material-ui/icons/Cancel"));

var _withBasicStyles = require("../../utils/withBasicStyles");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function NoOptionsMessage(props) {
  return _react.default.createElement(_Typography.default, (0, _extends2.default)({
    color: "textSecondary",
    className: props.selectProps.classes.noOptionsMessage
  }, props.innerProps), props.children);
}

function inputComponent(_ref) {
  var inputRef = _ref.inputRef,
      props = (0, _objectWithoutProperties2.default)(_ref, ["inputRef"]);
  return _react.default.createElement("div", (0, _extends2.default)({
    ref: inputRef
  }, props));
}

function Control(props) {
  return _react.default.createElement(_TextField.default, (0, _extends2.default)({
    fullWidth: true,
    InputProps: {
      inputComponent: inputComponent,
      inputProps: _objectSpread({
        className: props.selectProps.classes.input,
        inputRef: props.innerRef,
        children: props.children
      }, props.innerProps)
    }
  }, props.selectProps.textFieldProps));
}

function Option(props) {
  return _react.default.createElement(_MenuItem.default, (0, _extends2.default)({
    buttonRef: props.innerRef,
    selected: props.isFocused,
    component: "div",
    style: {
      fontWeight: props.isSelected ? 500 : 400
    }
  }, props.innerProps), props.children);
}

function Placeholder(props) {
  return _react.default.createElement(_Typography.default, (0, _extends2.default)({
    color: "textSecondary",
    className: props.selectProps.classes.placeholder
  }, props.innerProps), props.children);
}

function SingleValue(props) {
  return _react.default.createElement(_Typography.default, (0, _extends2.default)({
    className: props.selectProps.classes.singleValue
  }, props.innerProps), props.children);
}

function ValueContainer(props) {
  return _react.default.createElement("div", {
    className: props.selectProps.classes.valueContainer
  }, props.children);
}

function MultiValue(props) {
  return _react.default.createElement(_Chip.default, {
    tabIndex: -1,
    label: props.children,
    className: (0, _classnames.default)(props.selectProps.classes.chip, (0, _defineProperty2.default)({}, props.selectProps.classes.chipFocused, props.isFocused)),
    onDelete: props.removeProps.onClick,
    deleteIcon: _react.default.createElement(_Cancel.default, props.removeProps)
  });
}

function Menu(props) {
  return _react.default.createElement(_Paper.default, (0, _extends2.default)({
    square: true,
    className: props.selectProps.classes.paper
  }, props.innerProps), props.children);
}

var components = {
  Control: Control,
  Menu: Menu,
  MultiValue: MultiValue,
  NoOptionsMessage: NoOptionsMessage,
  Option: Option,
  Placeholder: Placeholder,
  SingleValue: SingleValue,
  ValueContainer: ValueContainer
};

var AutoSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AutoSelect, _Component);

  function AutoSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, AutoSelect);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AutoSelect).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function () {
      return function (selectedItem) {
        var target = {
          target: {
            value: selectedItem && selectedItem.value,
            selectedItem: selectedItem,
            editor: (0, _assertThisInitialized2.default)(_this)
          }
        };

        _this.props.onChange(target);
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "convertToOptions", function () {
      var _this$props$component = _this.props.component,
          component = _this$props$component === void 0 ? {} : _this$props$component;
      var data = component.data;
      var options = [];

      if (data) {
        data.forEach(function (element) {
          options.push({
            value: element[component.valueAtt || 'value'],
            label: element[component.labelAtt || 'label']
          });
        });
      }

      return options;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSelectedOption", function (options) {
      var singleValue = _this.state.single;
      return options && options.find(function (_ref2) {
        var value = _ref2.value;
        return value === singleValue;
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getSelectStyle", function () {
      var theme = _this.props.theme;
      return {
        input: function input(base) {
          return _objectSpread({}, base, {
            color: theme.palette.text.primary,
            '& input': {
              font: 'inherit'
            }
          });
        }
      };
    });
    _this.state = {
      single: undefined
    };
    return _this;
  }

  (0, _createClass2.default)(AutoSelect, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var options = this.convertToOptions();
      return _react.default.createElement("div", {
        className: classes.root
      }, _react.default.createElement(_NoSsr.default, null, _react.default.createElement(_reactSelect.default, {
        classes: classes,
        styles: this.getSelectStyle(),
        options: options,
        components: components,
        value: this.getSelectedOption(options),
        onChange: this.handleChange('single'),
        placeholder: "Search element (start with a)",
        isClearable: true
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var valueFromState = state.single;
      var valueFromProps = props.value;

      if (valueFromState !== valueFromProps && valueFromProps) {
        return {
          single: valueFromProps
        };
      }

      return null;
    }
  }]);
  return AutoSelect;
}(_react.Component);

var _default = (0, _withBasicStyles.withAutoSuggestStyles)(AutoSelect, {
  withTheme: true
});

exports.default = _default;