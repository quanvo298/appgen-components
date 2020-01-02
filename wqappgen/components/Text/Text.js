"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rebass = require("rebass");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _styledSystem = require("styled-system");

var getMaxHeight = function getMaxHeight(_ref) {
  var theme = _ref.theme,
      lineHeight = _ref.lineHeight,
      lineClamp = _ref.lineClamp;
  var themeLineHeight = theme.lineHeights[lineHeight];

  if (themeLineHeight) {
    return "calc(".concat(themeLineHeight, "*").concat(lineClamp, ")");
  }

  if (typeof lineHeight === 'number') {
    return "calc(".concat(lineHeight, "em*").concat(lineClamp, ")");
  }

  return "calc(".concat(lineHeight, "*").concat(lineClamp, ")");
};

var ellipsisStyle = (0, _styledComponents.css)(["overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:", ";max-height:", ";"], function (_ref2) {
  var lineClamp = _ref2.lineClamp;
  return lineClamp;
}, getMaxHeight);
var Text = (0, _styledComponents.default)(_rebass.Text).withConfig({
  displayName: "Text",
  componentId: "sc-1zkqr4-0"
})(["", ";cursor:", ";", ";", ";text-decoration:none;", ""], _styledSystem.opacity, function (props) {
  return props.cursor && props.cursor;
}, _styledSystem.border, _styledSystem.display, function (props) {
  return props.lineClamp && ellipsisStyle;
});
Text.defaultProps = {
  fontSize: 14,
  fontWeight: 1,
  lineHeight: 2,
  color: 'black'
};
var _default = Text;
exports.default = _default;