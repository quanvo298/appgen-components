"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItemCategoryHeaderDetail = exports.ListItemCategoryHeader = exports.ListItemCategory = exports.ListItemWidget = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _Wrapper = _interopRequireDefault(require("../Container/Wrapper"));

var _BasicButton = _interopRequireDefault(require("../Button/BasicButton"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var _LocalProvider = require("../../utils/LocalProvider");

var ListItemComponent = function ListItemComponent(_ref) {
  var iconComponent = _ref.iconComponent,
      title = _ref.title,
      className = _ref.className,
      textClasses = _ref.textClasses,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["iconComponent", "title", "className", "textClasses", "children"]);
  return _react.default.createElement(_ListItem.default, (0, _extends2.default)({
    className: className
  }, restProps), iconComponent && _react.default.createElement(_ListItemIcon.default, null, iconComponent), _react.default.createElement(_ListItemText.default, {
    classes: textClasses
  }, title), children);
};

var ListItemCategory = function ListItemCategory(props) {
  var classes = (0, _withBasicStyles.makeListItemStyles)();
  return _react.default.createElement(ListItemComponent, (0, _extends2.default)({
    className: (0, _classnames.default)(classes.item, classes.itemCategory),
    textClasses: {
      primary: classes.itemPrimary
    }
  }, props));
};

exports.ListItemCategory = ListItemCategory;

var ListItemCategoryHeader = function ListItemCategoryHeader(props) {
  var classes = (0, _withBasicStyles.makeListItemStyles)();
  return _react.default.createElement(ListItemComponent, (0, _extends2.default)({
    className: (0, _classnames.default)(classes.categoryHeader, classes.itemActionable),
    textClasses: {
      primary: classes.categoryHeaderPrimary
    }
  }, props));
};

exports.ListItemCategoryHeader = ListItemCategoryHeader;

var ListItemWidget = function ListItemWidget(props) {
  var classes = (0, _withBasicStyles.makeListItemStyles)();
  return _react.default.createElement(ListItemComponent, (0, _extends2.default)({
    className: (0, _classnames.default)(classes.item, classes.itemActionable),
    textClasses: {
      primary: classes.itemPrimary
    }
  }, props));
};

exports.ListItemWidget = ListItemWidget;

var ListItemCategoryHeaderDetail = function ListItemCategoryHeaderDetail(_ref2) {
  var titleKey = _ref2.titleKey,
      labelBtns = _ref2.labelBtns,
      clickBtns = _ref2.clickBtns;
  var polyglot = (0, _LocalProvider.usePolyglot)();
  var title = polyglot.t(titleKey);

  var handleClick = function handleClick(index) {
    if (clickBtns.length > index) {
      clickBtns[index]();
    }
  };

  return _react.default.createElement(ListItemCategoryHeader, {
    title: title
  }, labelBtns.length > 0 && _react.default.createElement(_Wrapper.default, null, labelBtns.map(function (label, index) {
    return _react.default.createElement(_BasicButton.default, {
      key: index,
      onClick: function onClick() {
        return handleClick(index);
      }
    }, polyglot.t(label));
  })));
};

exports.ListItemCategoryHeaderDetail = ListItemCategoryHeaderDetail;
ListItemCategoryHeaderDetail.defaultProps = {
  labelBtns: [],
  clickBtns: []
};