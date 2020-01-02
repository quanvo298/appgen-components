"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Home = _interopRequireDefault(require("@material-ui/icons/Home"));

var HomeIconComponent = _react.default.createElement(_Home.default, null);

var SiteNavigation = function SiteNavigation(polyglot) {
  return {
    home: {
      title: polyglot.t('nav.title'),
      href: '/',
      icon: HomeIconComponent
    }
  };
};

var _default = SiteNavigation;
exports.default = _default;