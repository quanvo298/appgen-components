"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var DragItem = function DragItem(_ref) {
  var item = _ref.item,
      itemType = _ref.itemType,
      onDragStart = _ref.onDragStart,
      onDragEnd = _ref.onDragEnd,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["item", "itemType", "onDragStart", "onDragEnd"]);

  var handleDragStart = function handleDragStart(event) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target);
    event.dataTransfer.setDragImage(event.target, 20, 20);
    event.draggedItem = item;
    event.draggedItemType = itemType;

    if (onDragStart) {
      onDragStart(event);
    }

    event.stopPropagation();
  };

  var handleDragEnd = function handleDragEnd(event) {
    event.stopPropagation();
    event.draggedItem = undefined;
    event.draggedItemType = undefined;

    if (onDragEnd) {
      onDragEnd(event);
    }
  };

  return _react.default.createElement(_Wrapper.default, (0, _extends2.default)({
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd
  }, restProps));
};

var _default = DragItem;
exports.default = _default;