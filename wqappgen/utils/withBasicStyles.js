"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeListItemStyles = exports.withAutoSuggestStyles = exports.withTableStyles = exports.withDragableStyles = exports.withNotificationStyles = exports.withButtonStyles = exports.withNavigatorStyles = exports.withLayoutStyles = exports.withBasicFormStyles = exports.drawerWidth = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _styles = require("@material-ui/styles");

var _colors = require("@material-ui/core/colors");

var _colorManipulator = require("@material-ui/core/styles/colorManipulator");

var drawerWidth = 256;
exports.drawerWidth = drawerWidth;

var LayoutStyles = function LayoutStyles(theme) {
  return {
    root: {
      display: 'flex',
      minHeight: '100vh'
    },
    drawer: (0, _defineProperty2.default)({}, theme.breakpoints.up('sm'), {
      width: drawerWidth,
      flexShrink: 0
    }),
    appContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    mainContent: {
      flex: 1,
      padding: '36px 10px 0',
      background: '#eaeff1'
    }
  };
};

var BasicStyles = function BasicStyles() {
  return {
    paper: {
      flex: '1 0 auto',
      margin: 'auto',
      overflow: 'hidden'
    },
    contentWrapper: {
      margin: '40px 16px'
    },
    menuWrapper: {
      'text-align': 'center',
      margin: '20px 0px'
    }
  };
};

var NavigatorStyles = function NavigatorStyles(theme) {
  return {
    paper: {
      width: drawerWidth
    },
    divider: {
      marginTop: theme.spacing(1)
    }
  };
};

var ListItem = function ListItem(theme) {
  return {
    categoryHeader: {
      color: 'rgba(255, 255, 255, 0.7)',
      paddingTop: 16,
      paddingBottom: 16
    },
    categoryHeaderPrimary: {
      color: theme.palette.common.white
    },
    item: {
      paddingTop: 4,
      paddingBottom: 4,
      color: 'rgba(255, 255, 255, 0.7)'
    },
    itemCategory: {
      backgroundColor: '#232f3e',
      boxShadow: '0 -1px 0 #404854 inset',
      paddingTop: 16,
      paddingBottom: 16
    },
    itemActionable: {
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)'
      }
    },
    itemActiveItem: {
      color: '#4fc3f7'
    },
    itemPrimary: {
      paddingLeft: 20,
      fontSize: theme.typography.fontSize,
      '&$textDense': {
        fontSize: theme.typography.fontSize
      }
    }
  };
};

var ButtonStyles = function ButtonStyles(theme) {
  return {
    addButton: {
      marginRight: theme.spacing(1)
    }
  };
};

var NotificationStyles = function NotificationStyles(theme) {
  return {
    success: {
      backgroundColor: _colors.green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.main
    },
    warning: {
      backgroundColor: _colors.amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: 'flex',
      alignItems: 'center'
    }
  };
};

var DragableStyles = function DragableStyles() {
  return {
    dragable: {
      padding: '25px 10px 5px',
      background: '#eaeff1',
      minHeight: '30px',
      width: '100%',
      '&:hover': {
        display: 'block',
        padding: 2,
        'border-style': 'dotted'
      }
    },
    flatDragable: {
      background: '#eaeff1',
      padding: 1
    }
  };
};

var TableEditorStyles = function TableEditorStyles() {
  return {
    table: {
      '@global': {
        tr: {
          height: '30px'
        }
      }
    },
    trEditor: {
      '@global': {
        'td:last-child': {
          'padding-right': '0px'
        },
        'td:last-child svg': {
          display: 'none'
        }
      },
      '&:hover': {
        '@global': {
          'td:last-child svg': {
            display: 'block'
          }
        }
      }
    }
  };
};

var AutoSuggestStyles = function AutoSuggestStyles(theme) {
  return {
    input: {
      display: 'flex',
      padding: 0
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center',
      overflow: 'hidden'
    },
    chip: {
      margin: "".concat(theme.spacing(1 / 2), "px ").concat(theme.spacing(1 / 4), "px")
    },
    chipFocused: {
      backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700], 0.08)
    },
    noOptionsMessage: {
      padding: "".concat(theme.spacing(1), "px ").concat(theme.spacing(2), "px")
    },
    singleValue: {
      fontSize: 16
    },
    placeholder: {
      position: 'absolute',
      left: 2,
      fontSize: 16
    },
    paper: {
      position: 'absolute',
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing(2)
    }
  };
};

var withBasicFormStyles = function withBasicFormStyles(component) {
  return (0, _styles.withStyles)(BasicStyles)(component);
};

exports.withBasicFormStyles = withBasicFormStyles;

var withLayoutStyles = function withLayoutStyles(component) {
  return (0, _styles.withStyles)(LayoutStyles)(component);
};

exports.withLayoutStyles = withLayoutStyles;

var withNavigatorStyles = function withNavigatorStyles(component) {
  return (0, _styles.withStyles)(NavigatorStyles)(component);
};

exports.withNavigatorStyles = withNavigatorStyles;

var withButtonStyles = function withButtonStyles(component) {
  return (0, _styles.withStyles)(ButtonStyles)(component);
};

exports.withButtonStyles = withButtonStyles;

var withNotificationStyles = function withNotificationStyles(component) {
  return (0, _styles.withStyles)(NotificationStyles)(component);
};

exports.withNotificationStyles = withNotificationStyles;

var withDragableStyles = function withDragableStyles(component) {
  return (0, _styles.withStyles)(DragableStyles)(component);
};

exports.withDragableStyles = withDragableStyles;

var withTableStyles = function withTableStyles(component) {
  return (0, _styles.withStyles)(TableEditorStyles)(component);
};

exports.withTableStyles = withTableStyles;

var withAutoSuggestStyles = function withAutoSuggestStyles(component, option) {
  return (0, _styles.withStyles)(AutoSuggestStyles, option)(component);
};

exports.withAutoSuggestStyles = withAutoSuggestStyles;
var makeListItemStyles = (0, _styles.makeStyles)(ListItem);
exports.makeListItemStyles = makeListItemStyles;