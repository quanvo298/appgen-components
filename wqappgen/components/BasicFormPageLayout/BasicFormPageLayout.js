"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Row = _interopRequireDefault(require("../Container/Row"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _BasicFormWidget = _interopRequireDefault(require("../BasicForm/BasicFormWidget"));

var _ContentList = _interopRequireDefault(require("../ContentList/ContentList"));

var BasicFormPageLayout = function BasicFormPageLayout(_ref) {
  var formConfig = _ref.formConfig,
      contentListConfig = _ref.contentListConfig;
  return _react.default.createElement(_Wrapper.default, null, _react.default.createElement(_BasicFormWidget.default, formConfig), _react.default.createElement(_Row.default, {
    pt: 3
  }, _react.default.createElement(_ContentList.default, contentListConfig)));
};

var _default = BasicFormPageLayout;
exports.default = _default;