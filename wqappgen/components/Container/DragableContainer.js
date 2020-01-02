"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var DragableContainer = function DragableContainer(_ref) {
  var classes = _ref.classes,
      onDrop = _ref.onDrop,
      supportDrop = _ref.supportDrop,
      children = _ref.children,
      notPadding = _ref.notPadding;

  var onDragLeave = function onDragLeave(event) {
    event.target.style.border = 'none';
    event.target.style.background = 'none';
    event.stopPropagation();
    event.preventDefault();
  };

  var onDragOver = function onDragOver(event) {
    if (supportDrop && supportDrop(event)) {
      event.target.style.border = 'purple groove';
      event.target.style.background = 'azure';
    }

    event.stopPropagation();
    event.preventDefault();
  };

  var handleDrop = function handleDrop(event) {
    event.target.style.border = 'none';
    event.target.style.background = 'none';
    onDrop(event);
  };

  return _react.default.createElement(_Wrapper.default, {
    className: notPadding ? classes.flatDragable : classes.dragable,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDrop: onDrop && handleDrop
  }, children);
};

var _default = (0, _withBasicStyles.withDragableStyles)(DragableContainer);

exports.default = _default;