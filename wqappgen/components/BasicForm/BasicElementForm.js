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

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _InputLabel = _interopRequireDefault(require("@material-ui/core/InputLabel"));

var _Row = _interopRequireDefault(require("../Container/Row"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _ElementFormEditor = _interopRequireDefault(require("../ElementFormEditor/ElementFormEditor"));

var _constant = require("../../utils/constant");

var _BasicFormHelper = require("../../helper/BasicFormHelper");

var LABEL_WIDTH = 200;
var IGNORE_COMPONENT_TYPE = [_constant.BaiscFormPropertyComponentType.Grid];

var ElementFormControl = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(_Row.default, {
    flexWrap: "nowrap",
    m: 2
  }, _react.default.createElement(_Wrapper.default, {
    position: "relative",
    width: "".concat(LABEL_WIDTH, "px"),
    pt: 16
  }, _react.default.createElement(_InputLabel.default, {
    position: "relative",
    shrink: false
  }, props.label, " ", props.required && '*', ":")), _react.default.createElement(_Wrapper.default, {
    width: 1,
    mx: "0"
  }, _react.default.createElement(_ElementFormEditor.default, (0, _extends2.default)({}, props, {
    forwardedRef: ref
  }))));
});

var ElementForm = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(_ElementFormEditor.default, (0, _extends2.default)({
    forwardRef: ref
  }, props));
});

var BasicElementForm =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BasicElementForm, _Component);

  function BasicElementForm(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BasicElementForm);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BasicElementForm).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "validate", function () {
      var elemenentFormValidate = _this.editorRef.current && _this.editorRef.current[_BasicFormHelper.FUNCTION_VALIDATE];

      if (elemenentFormValidate) {
        return elemenentFormValidate();
      }

      return false;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doRender", function () {
      var component = _this.props.component;

      if (component) {
        return !IGNORE_COMPONENT_TYPE.includes(component.type);
      }

      return true;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setError", function (error) {
      if (_this.doRender()) {
        _this.setState({
          error: error,
          fromSetState: true
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "changeDefinition", function (definition) {
      _this.setState({
        overridedDefinition: definition
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setValue", function (value) {
      _this.setState({
        value: value,
        fromSetState: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "hanldeInputChange", function (name, valueKey) {
      return function (event) {
        var onInputChange = _this.props.onInputChange;
        var target = event.target;
        var elementValue = valueKey ? target[valueKey] : target.value;

        if (onInputChange) {
          onInputChange(name, elementValue)(event);
        }

        if (_this.doRender()) {
          _this.setState({
            value: elementValue,
            fromSetState: true
          });
        }
      };
    });
    _this.editorRef = _react.default.createRef();
    _this.state = {
      overridedDefinition: {},
      value: undefined,
      error: false,
      fromSetState: false
    };
    return _this;
  }

  (0, _createClass2.default)(BasicElementForm, [{
    key: "render",
    value: function render() {
      var supportFormControl = this.props.supportFormControl;
      var _this$state = this.state,
          value = _this$state.value,
          error = _this$state.error,
          overridedDefinition = _this$state.overridedDefinition;
      return supportFormControl ? _react.default.createElement(ElementFormControl, (0, _extends2.default)({}, this.props, overridedDefinition, {
        value: value,
        error: error,
        onInputChange: this.hanldeInputChange,
        ref: this.editorRef
      })) : _react.default.createElement(ElementForm, (0, _extends2.default)({}, this.props, overridedDefinition, {
        value: value,
        error: error,
        ref: this.editorRef,
        onInputChange: this.hanldeInputChange
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var value = props.value,
          error = props.error;
      var valueFromState = state.value,
          errorFromState = state.error,
          fromSetState = state.fromSetState;
      var shouldBeUpdated = fromSetState || value !== valueFromState || error !== errorFromState;

      if (shouldBeUpdated) {
        return fromSetState ? {
          value: valueFromState,
          error: errorFromState,
          fromSetState: false
        } : {
          value: value,
          error: error,
          fromSetState: false
        };
      }

      return null;
    }
  }]);
  return BasicElementForm;
}(_react.Component);

BasicElementForm.defaultProps = {
  supportFormControl: true
};
var _default = BasicElementForm;
exports.default = _default;