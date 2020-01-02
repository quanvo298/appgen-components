"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _BasicButton = _interopRequireDefault(require("../Button/BasicButton"));

var ToolbarButton = function ToolbarButton(_ref) {
  var toolbarButtons = _ref.toolbarButtons;
  return toolbarButtons && toolbarButtons.map(function (toolbarButton, index) {
    return _react.default.createElement(_BasicButton.default, (0, _extends2.default)({
      key: index
    }, toolbarButton), toolbarButton.label);
  });
};

var _default = ToolbarButton;
exports.default = _default;