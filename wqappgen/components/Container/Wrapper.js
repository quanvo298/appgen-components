"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rebass = require("rebass");

var _styledSystem = require("styled-system");

var Wrapper = (0, _styledComponents.default)(_rebass.Box).withConfig({
  displayName: "Wrapper",
  componentId: "c3v2mn-0"
})(["", ";", ";", ";"], _styledSystem.maxWidth, _styledSystem.textAlign, _styledSystem.position);
Wrapper.defaultProps = {
  mx: [0],
  maxWidth: '100%',
  px: [2, 0]
};
var _default = Wrapper;
exports.default = _default;