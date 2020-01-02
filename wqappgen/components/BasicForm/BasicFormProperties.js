"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _withBasicStyles = require("../../utils/withBasicStyles");

var _Validator = require("../../helper/Validator");

var _PubSub = _interopRequireWildcard(require("../../utils/PubSub"));

var _constant = require("../../utils/constant");

var _BasicFormLayout = _interopRequireDefault(require("./BasicFormLayout"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BasicFormProperties =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(BasicFormProperties, _Component);

  function BasicFormProperties(_props) {
    var _this;

    (0, _classCallCheck2.default)(this, BasicFormProperties);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BasicFormProperties).call(this, _props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderElementForm", function (beforeChanges) {
      var updatedItem = _this.state.values;
      Object.keys(updatedItem).forEach(function (elementName) {
        if (updatedItem[elementName] !== beforeChanges[elementName]) {
          var elementFormRef = _this.elementFormRefs[elementName];
          elementFormRef.setValue(updatedItem[elementName]);
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onPropertyChange", function (name, value) {
      var onPropertyChange = _this.props.onPropertyChange;
      var values = _this.state.values;

      if (onPropertyChange) {
        var beforeChanges = _objectSpread({}, values);

        onPropertyChange(name, value, values);

        _this.renderElementForm(beforeChanges);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "processAfterPropertyChange", function (name, value) {
      var onAfterPropertiesChanged = _this.props.onAfterPropertiesChanged;
      var updatedItem = _this.state.values;

      if (onAfterPropertiesChanged) {
        var beforeChanges = _objectSpread({}, updatedItem);

        onAfterPropertiesChanged({
          name: name,
          value: value,
          updatedItem: updatedItem
        });

        _this.renderElementForm(beforeChanges);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onInputChange", function (name, elementValue) {
      return function () {
        var values = _this.state.values;
        values[name] = elementValue;

        _this.onPropertyChange(name, elementValue);

        _this.processAfterPropertyChange(name, elementValue);
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onKeyPress", function (name) {
      return function (event) {
        var elements = _this.props.elements;

        if ((0, _BasicFormHelper.checkElementByRegExp)(elements, name, event.key)) {
          event.preventDefault();
        }
      };
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetForm", function () {
      var _this$props = _this.props,
          elements = _this$props.elements,
          selectedItem = _this$props.selectedItem;
      var values = (0, _BasicFormHelper.processInitialValues)(elements, selectedItem);

      _this.setState({
        values: values
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "processOvverideUpdatedItemSaved", function (updatedItem) {
      var onOvverideUpdatedItemSaved = _this.props.onOvverideUpdatedItemSaved;

      if (onOvverideUpdatedItemSaved) {
        return onOvverideUpdatedItemSaved(updatedItem);
      }

      return updatedItem;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "processOvverideUpdatedItemModified", function (updatedItem) {
      var onOvverideUpdatedItemModified = _this.props.onOvverideUpdatedItemModified;

      if (onOvverideUpdatedItemModified) {
        return onOvverideUpdatedItemModified(updatedItem);
      }

      return updatedItem;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "processAfterSaved", function (updatedItem) {
      var onAfterSaved = _this.props.onAfterSaved;

      if (onAfterSaved) {
        onAfterSaved(updatedItem);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "processOvverideUpdatedItem", function () {
      var _this$props2 = _this.props,
          modeForm = _this$props2.modeForm,
          selectedItem = _this$props2.selectedItem;
      var values = _this.state.values;

      if ((0, _BasicFormHelper.isUpdatedForm)(modeForm)) {
        var updatedItem = _objectSpread({}, selectedItem, {}, values);

        return _this.processOvverideUpdatedItemModified(updatedItem);
      }

      if ((0, _BasicFormHelper.isNewForm)(modeForm)) {
        return _this.processOvverideUpdatedItemSaved(values);
      }

      return values;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doAddAndSave", function (updatedItem) {
      var _this$props3 = _this.props,
          onUpdate = _this$props3.onUpdate,
          onSave = _this$props3.onSave,
          modeForm = _this$props3.modeForm;

      if ((0, _BasicFormHelper.isUpdatedForm)(modeForm)) {
        onUpdate(updatedItem);

        _this.processAfterSaved(updatedItem);
      } else if ((0, _BasicFormHelper.isNewForm)(modeForm)) {
        onSave(updatedItem);

        _this.processAfterSaved(updatedItem);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "processErrors", function (errors) {
      Object.keys(errors).forEach(function (elementName) {
        if (errors[elementName]) {
          var elementFormRef = _this.elementFormRefs[elementName];
          elementFormRef.setError(true);
        }
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addElementFormRef", function (elementFormRef) {
      if (elementFormRef) {
        var props = elementFormRef.props;

        if (props) {
          var name = props.name;
          _this.elementFormRefs[name] = elementFormRef;
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "proceedValidateItem", function (callback) {
      var _this$props4 = _this.props,
          elements = _this$props4.elements,
          onValidateUpdatedItemBeforeSaved = _this$props4.onValidateUpdatedItemBeforeSaved,
          onValidatePropertyBeforeSaved = _this$props4.onValidatePropertyBeforeSaved,
          polyglot = _this$props4.polyglot;
      var values = _this.state.values;
      var validationResult = (0, _BasicFormHelper.validateElements)(elements, values, _this.elementFormRefs);
      var validateStrategy = (0, _Validator.createValidatorStrategy)(polyglot);
      (0, _BasicFormHelper.validatePropertyBeforeSaved)(validationResult, elements, values, onValidatePropertyBeforeSaved, validateStrategy);
      var disabled = validationResult.disabled,
          errors = validationResult.errors;

      if (disabled) {
        _this.processErrors(errors);

        if (validateStrategy.hasErrors()) {
          _PubSub.default.publish({
            message: validateStrategy.getErrors(),
            kind: _constant.NotificationKind.Error
          }, _PubSub.SUBSCRIPTION.Notification);
        }

        return;
      }

      var updatedItem = _this.processOvverideUpdatedItem();

      (0, _BasicFormHelper.validateUpdatedItemBeforeSaved)(validationResult, updatedItem, onValidateUpdatedItemBeforeSaved, validateStrategy);

      if (validationResult.disabled && validateStrategy.hasErrors()) {
        _PubSub.default.publish({
          message: validateStrategy.getErrors(),
          kind: _constant.NotificationKind.Error
        }, _PubSub.SUBSCRIPTION.Notification);

        return;
      }

      if (callback) {
        callback(updatedItem);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSave", function () {
      return _this.proceedValidateItem(_this.doAddAndSave);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleReset", function () {
      return _this.resetForm();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doReset", function () {
      return _this.props.disableReset || true;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClickToolbarButton", function (proceedItem, callback) {
      return _this.proceedValidateItem(callback);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "proceedToolbarButton", function () {
      var formToolbarButton = _this.props.formToolbarButton;
      var proceedList = [];

      if (formToolbarButton) {
        proceedList = (0, _toConsumableArray2.default)(formToolbarButton);
        proceedList.forEach(function (proceedItem) {
          var originalOnClick = proceedItem.onClick;

          if (proceedItem.onClick) {
            proceedItem.onClick = function () {
              return _this.handleClickToolbarButton(proceedItem, originalOnClick);
            };
          }
        });
      }

      return proceedList;
    });
    _this.elementFormRefs = {};
    _this.state = {
      selectedItem: {}
    };
    return _this;
  }

  (0, _createClass2.default)(BasicFormProperties, [{
    key: "doSave",
    value: function doSave() {
      var _this$props5 = this.props,
          disableSave = _this$props5.disableSave,
          onSave = _this$props5.onSave,
          onUpdate = _this$props5.onUpdate,
          modeForm = _this$props5.modeForm;

      if (disableSave) {
        return false;
      }

      if ((0, _BasicFormHelper.isUpdatedForm)(modeForm) && onUpdate) {
        return true;
      }

      if (onSave) {
        return true;
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props,
          elements = _this$props6.elements,
          classes = _this$props6.classes,
          onCellChange = _this$props6.onCellChange;
      var values = this.state.values;
      var supportSave = this.doSave();
      var supportReset = this.doReset();
      return _react.default.createElement(_BasicFormLayout.default, {
        classes: classes,
        formToolbarButton: this.proceedToolbarButton(),
        elements: elements,
        elementsValue: values,
        doSave: supportSave,
        onSave: this.handleSave,
        doReset: supportReset,
        onReset: this.handleReset,
        onInputChange: this.onInputChange,
        onCellChange: onCellChange,
        onKeyPress: this.onKeyPress,
        forwardRef: this.addElementFormRef
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var elements = props.elements,
          selectedItem = props.selectedItem;
      var selectedItemFromState = state.selectedItem;

      if (selectedItem !== selectedItemFromState) {
        var values = (0, _BasicFormHelper.processInitialValues)(elements, selectedItem);
        return {
          values: values,
          selectedItem: selectedItem
        };
      }

      return null;
    }
  }]);
  return BasicFormProperties;
}(_react.Component);

var _default = (0, _withPolyglot.default)((0, _withBasicStyles.withBasicFormStyles)(BasicFormProperties));

exports.default = _default;