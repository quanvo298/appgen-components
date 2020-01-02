"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireWildcard(require("react"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var _constant = require("../../utils/constant");

var _LocalProvider = require("../../utils/LocalProvider");

var _DeleteConfirmDialog = _interopRequireDefault(require("../Dialog/DeleteConfirmDialog"));

var _BasicBoxWidget = _interopRequireDefault(require("../BasicBoxWidget/BasicBoxWidget"));

var _ModelHelper = require("../../helper/ModelHelper");

var _ToolbarButton = _interopRequireDefault(require("../Toolbar/ToolbarButton"));

var _BasicFormProperties = _interopRequireDefault(require("./BasicFormProperties"));

var ButtonsBox = function ButtonsBox(_ref) {
  var supportNew = _ref.supportNew,
      supportDelete = _ref.supportDelete,
      handleAdd = _ref.handleAdd,
      handleDelete = _ref.handleDelete,
      toolbarButtons = _ref.toolbarButtons;
  var polyglot = (0, _LocalProvider.usePolyglot)();
  var cloneToolbarButtons = [];

  if (supportNew) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.new'),
      onClick: handleAdd
    });
  }

  if (supportDelete) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.delete'),
      onClick: handleDelete,
      color: 'secondary'
    });
  }

  if (toolbarButtons) {
    cloneToolbarButtons = [].concat((0, _toConsumableArray2.default)(cloneToolbarButtons), (0, _toConsumableArray2.default)(toolbarButtons));
  }

  return _react.default.createElement(_ToolbarButton.default, {
    toolbarButtons: cloneToolbarButtons
  });
};

var BasicFormWidget =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BasicFormWidget, _Component);

  function BasicFormWidget(props) {
    var _this;

    (0, _classCallCheck2.default)(this, BasicFormWidget);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BasicFormWidget).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "markNew", function () {
      _this.props.onAddNew();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "markDelete", function () {
      _this.deleteDialogRef.current.show();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "makeSureDelete", function () {
      var _this$props = _this.props,
          onDelete = _this$props.onDelete,
          selectedItem = _this$props.selectedItem;
      onDelete(selectedItem);

      _this.deleteDialogRef.current.close();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doDelete", function () {
      var _this$props2 = _this.props,
          disableDelete = _this$props2.disableDelete,
          onDelete = _this$props2.onDelete,
          selectedItem = _this$props2.selectedItem;
      return disableDelete ? false : onDelete && selectedItem;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doAdd", function () {
      var onAddNew = _this.props.onAddNew;
      return onAddNew;
    });
    _this.deleteDialogRef = _react.default.createRef();
    _this.state = {
      modeForm: _constant.ModeFormType.NEW
    };
    return _this;
  }

  (0, _createClass2.default)(BasicFormWidget, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          classes = _this$props3.classes,
          title = _this$props3.title,
          toolbarButtons = _this$props3.toolbarButtons;
      var modeForm = this.state.modeForm;
      var supportDelete = this.doDelete();
      var supportNew = this.doAdd();

      var ButtonsBoxInstance = _react.default.createElement(ButtonsBox, {
        supportNew: supportNew,
        supportDelete: supportDelete,
        handleAdd: this.markNew,
        handleDelete: this.markDelete,
        toolbarButtons: toolbarButtons
      });

      return _react.default.createElement(_BasicBoxWidget.default, {
        title: title,
        buttonsBox: ButtonsBoxInstance
      }, _react.default.createElement(_BasicFormProperties.default, (0, _extends2.default)({}, this.props, {
        modeForm: modeForm,
        classes: classes
      })), _react.default.createElement(_DeleteConfirmDialog.default, {
        onConfirm: this.makeSureDelete,
        ref: this.deleteDialogRef
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var selectedItem = props.selectedItem;
      var modeForm = state.modeForm;
      var newModeForm = selectedItem && (0, _ModelHelper.getEntityId)(selectedItem) ? _constant.ModeFormType.UPDATE : _constant.ModeFormType.NEW;
      if (modeForm !== newModeForm) return {
        modeForm: newModeForm
      };
      return null;
    }
  }]);
  return BasicFormWidget;
}(_react.Component);

var _default = (0, _withBasicStyles.withBasicFormStyles)(BasicFormWidget);

exports.default = _default;