"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _LocalProvider = require("../../utils/LocalProvider");

var _ConfirmDialog = _interopRequireDefault(require("./ConfirmDialog"));

var DeleteConfirmDialog = _react.default.forwardRef(function (props, ref) {
  return _react.default.createElement(_ConfirmDialog.default, {
    ref: ref,
    content: (0, _LocalProvider.usePolyglot)().t('message.confirm.delete'),
    onConfirm: props.onConfirm,
    openDialog: props.openDialog
  });
});

var _default = DeleteConfirmDialog;
exports.default = _default;