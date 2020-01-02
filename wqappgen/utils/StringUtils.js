"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containString = exports.removeAllWhiteSpace = exports.isNotBlank = exports.isBlank = void 0;

var isBlank = function isBlank(str) {
  return !(str && str.trim && str.trim().length > 0);
};

exports.isBlank = isBlank;

var isNotBlank = function isNotBlank(str) {
  return !isBlank(str);
};

exports.isNotBlank = isNotBlank;

var removeAllWhiteSpace = function removeAllWhiteSpace(str) {
  return str.replace(/\s/g, '');
};

exports.removeAllWhiteSpace = removeAllWhiteSpace;

var containString = function containString(stringValue, regExp) {
  if (regExp instanceof Object) {
    var conditions = regExp.map(function (rule) {
      return new RegExp(rule, 'g');
    });
    var result = conditions.find(function (condition) {
      return condition.test(stringValue);
    });
    return result;
  }

  if (regExp) {
    var condition = new RegExp(regExp, 'g');

    var _result = condition.test(stringValue);

    return _result;
  }

  return true;
};

exports.containString = containString;