"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _LocalProvider = require("./LocalProvider");

var withPolyglot = function withPolyglot(WrappedComponent) {
  var Wrapped =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(Wrapped, _Component);

    function Wrapped() {
      (0, _classCallCheck2.default)(this, Wrapped);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Wrapped).apply(this, arguments));
    }

    (0, _createClass2.default)(Wrapped, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            forwardedRef = _this$props.forwardedRef,
            restProps = (0, _objectWithoutProperties2.default)(_this$props, ["forwardedRef"]);
        return _react.default.createElement(_LocalProvider.LocalProviderCtx.Consumer, null, function (polyglot) {
          return _react.default.createElement(WrappedComponent, (0, _extends2.default)({
            ref: forwardedRef
          }, restProps, {
            polyglot: polyglot
          }));
        });
      }
    }]);
    return Wrapped;
  }(_react.Component);

  return (0, _react.forwardRef)(function (props, ref) {
    return _react.default.createElement(Wrapped, (0, _extends2.default)({}, props, {
      forwardedRef: ref
    }));
  });
};

var _default = withPolyglot;
exports.default = _default;