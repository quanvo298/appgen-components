"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePolyglot = exports.default = exports.LocalProviderCtx = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nodePolyglot = _interopRequireDefault(require("node-polyglot"));

var _locales = _interopRequireDefault(require("../locales"));

var LocalProviderCtx = (0, _react.createContext)();
exports.LocalProviderCtx = LocalProviderCtx;

var LocalProvider = function LocalProvider(_ref) {
  var children = _ref.children,
      locale = _ref.locale,
      phrases = _ref.phrases;
  var polyglot = new _nodePolyglot.default({
    locale: locale,
    phrases: phrases ? phrases[locale] : _locales.default[locale]
  });
  return _react.default.createElement(LocalProviderCtx.Provider, {
    value: polyglot
  }, _react.default.Children.only(children));
};

var _default = LocalProvider;
exports.default = _default;
LocalProvider.defaultProperties = {
  phrases: _locales.default
};

var usePolyglot = function usePolyglot() {
  return (0, _react.useContext)(LocalProviderCtx);
};

exports.usePolyglot = usePolyglot;