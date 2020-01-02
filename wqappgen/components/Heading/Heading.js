"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.H7 = exports.H6 = exports.H5 = exports.H4 = exports.H3 = exports.H2 = exports.H1 = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _Text = _interopRequireDefault(require("../Text/Text"));

var _PROPS;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var TextForHeading = function TextForHeading(name, headingProps, defaultProps) {
  function HeadingText(props) {
    var textProps = _objectSpread({}, props, {}, headingProps);

    return _react.default.createElement(_Text.default, textProps);
  }

  HeadingText.displayName = name;
  HeadingText.propTypes = _Text.default.propTypes;
  HeadingText.defaultProps = _objectSpread({}, _Text.default.defaultProps, {}, defaultProps, {
    lineHeight: 'normal',
    as: name.toLowerCase(),
    margin: 0
  });
  return HeadingText;
};

var NAMES = {
  H1: 'H1',
  H2: 'H2',
  H3: 'H3',
  H4: 'H4',
  H5: 'H5',
  H6: 'H6',
  H7: 'H7'
};
var PROPS = (_PROPS = {}, (0, _defineProperty2.default)(_PROPS, NAMES.H1, {
  fontSize: 6,
  fontWeight: 3
}), (0, _defineProperty2.default)(_PROPS, NAMES.H2, {
  fontSize: 5,
  fontWeight: 2
}), (0, _defineProperty2.default)(_PROPS, NAMES.H3, {
  fontSize: 4,
  fontWeight: 2
}), (0, _defineProperty2.default)(_PROPS, NAMES.H4, {
  fontSize: 3,
  fontWeight: 2
}), (0, _defineProperty2.default)(_PROPS, NAMES.H5, {
  fontSize: 2,
  fontWeight: 1
}), (0, _defineProperty2.default)(_PROPS, NAMES.H6, {
  fontSize: 1,
  fontWeight: 1
}), (0, _defineProperty2.default)(_PROPS, NAMES.H7, {
  fontSize: 0,
  fontWeight: 1
}), _PROPS);
var DEFAULT_PROPS = (0, _defineProperty2.default)({}, NAMES.H6, {
  opacity: '0.5'
});
var H1 = TextForHeading(NAMES.H1, PROPS.H1);
exports.H1 = H1;
var H2 = TextForHeading(NAMES.H2, PROPS.H2);
exports.H2 = H2;
var H3 = TextForHeading(NAMES.H3, PROPS.H3);
exports.H3 = H3;
var H4 = TextForHeading(NAMES.H4, PROPS.H4);
exports.H4 = H4;
var H5 = TextForHeading(NAMES.H5, PROPS.H5);
exports.H5 = H5;
var H6 = TextForHeading(NAMES.H6, PROPS.H6, DEFAULT_PROPS.H6);
exports.H6 = H6;
var H7 = TextForHeading(NAMES.H7, PROPS.H7);
exports.H7 = H7;