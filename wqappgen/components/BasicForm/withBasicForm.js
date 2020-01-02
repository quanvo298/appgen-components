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

var _react = _interopRequireWildcard(require("react"));

var _BasicFormHelper = require("../../helper/BasicFormHelper");

var _withPolyglot = _interopRequireDefault(require("../../utils/withPolyglot"));

var withBasicForm = function withBasicForm(formConfig) {
  return function (ComposedComponent) {
    var BasicFormComponent =
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(BasicFormComponent, _Component);

      function BasicFormComponent(props) {
        var _this;

        (0, _classCallCheck2.default)(this, BasicFormComponent);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BasicFormComponent).call(this, props));
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setComposedComponentInstance", function (ref) {
          _this.composedComponentInstance = ref;
        });
        (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "createFormConfig", function () {
          var polyglot = _this.props.polyglot;
          var formConfigWrapper = formConfig(polyglot);

          formConfigWrapper.onPropertyChange = function (name, value, updatedItem) {
            (0, _BasicFormHelper.handlePropertyChanged)(_this.composedComponentInstance, name, value, updatedItem);
          };

          formConfigWrapper.onCellChange = function (_ref) {
            var propertyName = _ref.propertyName,
                cellName = _ref.cellName,
                cellValue = _ref.cellValue,
                rowIndexed = _ref.rowIndexed,
                gridData = _ref.gridData,
                event = _ref.event;
            (0, _BasicFormHelper.handleCellChanged)(_this.composedComponentInstance, propertyName, cellName, cellValue, rowIndexed, gridData, event);
          };

          formConfigWrapper.onOvverideUpdatedItemSaved = function (updatedItem) {
            return (0, _BasicFormHelper.handleOvverideUpdatedItemSaved)(_this.composedComponentInstance, updatedItem);
          };

          formConfigWrapper.onOvverideUpdatedItemModified = function (updatedItem) {
            return (0, _BasicFormHelper.handleOvverideUpdatedItemModified)(_this.composedComponentInstance, updatedItem);
          };

          formConfigWrapper.onValidatePropertyBeforeSaved = function (validateStrategy, element, value, updatedItem) {
            return (0, _BasicFormHelper.handleValidatePropertyBeforeSaved)(_this.composedComponentInstance, validateStrategy, element, value, updatedItem);
          };

          formConfigWrapper.onValidateUpdatedItemBeforeSaved = function (validateStrategy, updatedItem) {
            return (0, _BasicFormHelper.handleValidateUpdatedItemBeforeSaved)(_this.composedComponentInstance, validateStrategy, updatedItem);
          };

          formConfigWrapper.onAfterSaved = function (updatedItem) {
            (0, _BasicFormHelper.handleAfterSaved)(_this.composedComponentInstance, updatedItem);
          };

          return formConfigWrapper;
        });
        _this.setComposedComponentInstance = _this.setComposedComponentInstance.bind((0, _assertThisInitialized2.default)(_this));
        return _this;
      }

      (0, _createClass2.default)(BasicFormComponent, [{
        key: "render",
        value: function render() {
          var basicFormConfig = this.createFormConfig();
          return _react.default.createElement(ComposedComponent, (0, _extends2.default)({
            basicFormConfig: basicFormConfig
          }, this.props, {
            ref: this.setComposedComponentInstance
          }));
        }
      }]);
      return BasicFormComponent;
    }(_react.Component);

    return (0, _withPolyglot.default)(BasicFormComponent);
  };
};

var _default = withBasicForm;
exports.default = _default;