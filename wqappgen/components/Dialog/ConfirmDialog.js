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

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _DialogActions = _interopRequireDefault(require("@material-ui/core/DialogActions"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _DialogContentText = _interopRequireDefault(require("@material-ui/core/DialogContentText"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _BasicButton = _interopRequireDefault(require("../Button/BasicButton"));

var _LocalProvider = require("../../utils/LocalProvider");

var Transition = _react.default.forwardRef(function Transition(props, ref) {
  return _react.default.createElement(_Slide.default, (0, _extends2.default)({
    direction: "up",
    ref: ref
  }, props));
});

var ButtonsBox = function ButtonsBox(_ref) {
  var handleAgree = _ref.handleAgree,
      handleDisagree = _ref.handleDisagree;
  var polyglot = (0, _LocalProvider.usePolyglot)();
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_BasicButton.default, {
    onClick: handleDisagree
  }, polyglot.t('btn.disagree')), _react.default.createElement(_BasicButton.default, {
    onClick: handleAgree
  }, polyglot.t('btn.agree')));
};

var ConfirmDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConfirmDialog, _Component);

  function ConfirmDialog(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ConfirmDialog);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConfirmDialog).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "show", function () {
      _this.setState({
        openDialog: true
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "close", function () {
      _this.setState({
        openDialog: false
      });
    });
    _this.state = {
      openDialog: false
    };
    return _this;
  }

  (0, _createClass2.default)(ConfirmDialog, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onConfirm = _this$props.onConfirm,
          content = _this$props.content;
      var openDialog = this.state.openDialog;
      return _react.default.createElement(_Dialog.default, {
        open: openDialog,
        TransitionComponent: Transition,
        keepMounted: true,
        onClose: this.close
      }, _react.default.createElement(_DialogContent.default, null, _react.default.createElement(_DialogContentText.default, null, content)), _react.default.createElement(_DialogActions.default, null, _react.default.createElement(ButtonsBox, {
        handleAgree: onConfirm,
        handleDisagree: this.close
      })));
    }
  }]);
  return ConfirmDialog;
}(_react.Component);

var _default = ConfirmDialog;
exports.default = _default;