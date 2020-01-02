"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _withBasicStyles = require("../../utils/withBasicStyles");

var _Drawer = _interopRequireDefault(require("@material-ui/core/Drawer"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _ExpandLess = _interopRequireDefault(require("@material-ui/icons/ExpandLess"));

var _ListItemWidget = require("../../components/ListItemWidget/ListItemWidget");

var _router = require("@reach/router");

var _core = require("@material-ui/core");

var _CollectionUtils = require("../../utils/CollectionUtils");

var ListItemCategoryWrapper = function ListItemCategoryWrapper(_ref) {
  var title = _ref.title,
      icon = _ref.icon,
      href = _ref.href;

  var hanldeClick = function hanldeClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (href) (0, _router.navigate)(href);
  };

  return _react.default.createElement(_ListItemWidget.ListItemCategory, {
    iconComponent: icon,
    onClick: hanldeClick,
    title: title
  });
};

var ListItemCategoryHeaderWrapper = function ListItemCategoryHeaderWrapper(_ref2) {
  var title = _ref2.title,
      icon = _ref2.icon,
      href = _ref2.href,
      supportExpand = _ref2.supportExpand,
      onExpand = _ref2.onExpand,
      expandStatus = _ref2.expandStatus;

  var hanldeClick = function hanldeClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (href) (0, _router.navigate)(href);
  };

  return _react.default.createElement(_ListItemWidget.ListItemCategoryHeader, {
    iconComponent: icon,
    onClick: hanldeClick,
    title: title
  }, supportExpand && expandStatus && _react.default.createElement(_ExpandLess.default, {
    onClick: onExpand
  }), supportExpand && !expandStatus && _react.default.createElement(_ExpandMore.default, {
    onClick: onExpand
  }));
};

var ListItemWrapper = function ListItemWrapper(_ref3) {
  var title = _ref3.title,
      icon = _ref3.icon,
      href = _ref3.href;

  var hanldeClick = function hanldeClick(event) {
    event.stopPropagation();
    event.preventDefault();
    if (href) (0, _router.navigate)(href);
  };

  return _react.default.createElement(_ListItemWidget.ListItemWidget, {
    iconComponent: icon,
    onClick: hanldeClick,
    title: title
  });
};

var NavBar =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(NavBar, _Component);

  function NavBar() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NavBar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NavBar)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      expandStatus: {}
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleExpandMoreAndLess", function (categoryId, event) {
      event.stopPropagation();
      event.preventDefault();
      var expandStatus = _this.state.expandStatus;
      expandStatus[categoryId] = !expandStatus[categoryId];

      _this.setState({
        expandStatus: expandStatus
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "doRenderSubCategories", function (category, index) {
      var subCategories = category.subCategories,
          supportExpand = category.supportExpand;
      var expandStatus = _this.state.expandStatus[index];
      return (0, _CollectionUtils.isNotEmpty)(subCategories) && (supportExpand && expandStatus || !supportExpand);
    });
    return _this;
  }

  (0, _createClass2.default)(NavBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          classes = _this$props.classes,
          _this$props$navigatio = _this$props.navigationConfig,
          navigationConfig = _this$props$navigatio === void 0 ? {} : _this$props$navigatio;
      var expandStatus = this.state.expandStatus;
      return _react.default.createElement(_Drawer.default, {
        variant: "permanent",
        className: classes.paper
      }, _react.default.createElement(_List.default, {
        disablePadding: true,
        className: classes.paper
      }, navigationConfig.home && _react.default.createElement(ListItemCategoryWrapper, navigationConfig.home), navigationConfig.categories && navigationConfig.categories.map(function (category, index) {
        return _react.default.createElement(_react.Fragment, {
          key: index
        }, _react.default.createElement(ListItemCategoryHeaderWrapper, {
          title: category.title,
          href: category.href,
          icon: category.icon,
          supportExpand: category.supportExpand,
          expandStatus: expandStatus[index],
          onExpand: function onExpand(event) {
            return _this2.handleExpandMoreAndLess(index, event);
          }
        }), _this2.doRenderSubCategories(category, index) && category.subCategories.map(function (subCatergory, subIndex) {
          return _react.default.createElement(ListItemWrapper, (0, _extends2.default)({
            key: subIndex
          }, subCatergory));
        }), _react.default.createElement(_core.Divider, {
          className: classes.divider
        }));
      })));
    }
  }]);
  return NavBar;
}(_react.Component);

var _default = (0, _withBasicStyles.withNavigatorStyles)(NavBar);

exports.default = _default;