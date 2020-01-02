"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _PubSub = _interopRequireDefault(require("./PubSub"));

var _StringUtils = require("./StringUtils");

var withSubscription = function withSubscription(subcriptionName) {
  return function (WrappedComponent) {
    return (
      /*#__PURE__*/
      function (_React$Component) {
        (0, _inherits2.default)(_class, _React$Component);

        function _class(props) {
          var _this;

          (0, _classCallCheck2.default)(this, _class);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).call(this, props));
          _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)(_this));
          _this.state = {
            data: undefined
          };
          return _this;
        }

        (0, _createClass2.default)(_class, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            if ((0, _StringUtils.isNotBlank)(subcriptionName)) {
              _PubSub.default.on(this.handleChange, subcriptionName);

              return;
            }

            _PubSub.default.on(this.handleChange);
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            if ((0, _StringUtils.isNotBlank)(subcriptionName)) {
              _PubSub.default.removeEventListener(this.handleChange, subcriptionName);

              return;
            }

            _PubSub.default.removeEventListener(this.handleChange);
          }
        }, {
          key: "handleChange",
          value: function handleChange(data) {
            this.setState({
              data: data
            });
          }
        }, {
          key: "render",
          value: function render() {
            return _react.default.createElement(WrappedComponent, (0, _extends2.default)({
              subcriptionItem: this.state.data
            }, this.props));
          }
        }]);
        return _class;
      }(_react.default.Component)
    );
  };
};

var _default = withSubscription;
exports.default = _default;