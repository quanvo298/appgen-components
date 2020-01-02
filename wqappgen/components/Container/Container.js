"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rebass = require("rebass");

var _styledSystem = require("styled-system");

var Container = (0, _styledComponents.default)(_rebass.Box).withConfig({
  displayName: "Container",
  componentId: "sc-1r5s2a0-0"
})(["", " ", ""], _styledSystem.maxWidth, _styledSystem.borderBottom);
Container.defaultProps = {
  mx: 'auto',
  maxWidth: '100%',
  px: [3, 0],
  width: ['750px', '970px', '1170px']
};
var _default = Container;
exports.default = _default;