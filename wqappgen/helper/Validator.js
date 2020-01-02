"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createValidatorStrategy = exports.validateElement = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _constant = require("../utils/constant");

var _StringUtils = require("../utils/StringUtils");

var _CollectionUtils = require("../utils/CollectionUtils");

var validateElement = function validateElement(element, newValue) {
  if (element.required && _constant.PropertyDataType.ArrayObject === element.type) {
    return (0, _CollectionUtils.isEmpty)(newValue);
  }

  if (element.required) {
    return (0, _StringUtils.isBlank)(newValue);
  }

  return false;
};

exports.validateElement = validateElement;

var buildValidatorStrategy = function buildValidatorStrategy(polyglot) {
  return {
    elementErrors: [],
    globalErrors: [],
    addGlobalError: function addGlobalError(message) {
      this.globalErrors.push({
        error: message
      });
    },
    addError: function addError(name, label, message) {
      var errorObj = {
        name: name.trim().toLowerCase(),
        error: message
      };

      if ((0, _StringUtils.isBlank)(message)) {
        errorObj.error = polyglot.t('message.error.invalid', {
          label: (0, _StringUtils.isNotBlank)(label) ? label : name
        });
      }

      this.elementErrors.push(errorObj);
    },
    addExistedError: function addExistedError(name, label, value) {
      this.addError(name, label, polyglot.t('message.error.existed', {
        label: "".concat((0, _StringUtils.isNotBlank)(label) ? label : name, " ").concat((0, _StringUtils.isNotBlank)(value) && ": ".concat(value))
      }));
    },
    hasErrors: function hasErrors() {
      return (0, _CollectionUtils.isNotEmpty)(this.elementErrors) || (0, _CollectionUtils.isNotEmpty)(this.globalErrors);
    },
    hasError: function hasError(name) {
      if ((0, _StringUtils.isNotBlank)(name)) {
        return this.elementErrors.find(function (_ele) {
          return _ele.name === name.trim().toLowerCase();
        });
      }

      return false;
    },
    getErrorMessages: function getErrorMessages() {
      var errorMsg = '';
      this.elementErrors.forEach(function (_element) {
        errorMsg += "<p>".concat(_element.error);
      });
      return errorMsg;
    },
    getErrors: function getErrors() {
      var elementMessageErrors = this.elementErrors.map(function (_ref) {
        var error = _ref.error;
        return error;
      });
      var globalMessageErrors = this.globalErrors.map(function (_ref2) {
        var error = _ref2.error;
        return error;
      });
      return [].concat((0, _toConsumableArray2.default)(elementMessageErrors), (0, _toConsumableArray2.default)(globalMessageErrors));
    }
  };
};

var createValidatorStrategy = function createValidatorStrategy(polyglot) {
  return buildValidatorStrategy(polyglot);
};

exports.createValidatorStrategy = createValidatorStrategy;