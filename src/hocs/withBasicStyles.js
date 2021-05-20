import { withStyles, makeStyles } from '@material-ui/styles';
import { amber, green } from '@material-ui/core/colors';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

export const drawerWidth = 256;

const LayoutStyles = theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '36px 10px 0',
    background: '#eaeff1',
  },
});

const BasicStyles = () => ({
  paper: {
    flex: '1 0 auto',
    margin: 'auto',
    overflow: 'hidden',
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  menuWrapper: {
    'text-align': 'center',
    margin: '20px 0px',
  },
  card: {
    flex: '1',
  },
  content: {
    padding: 0,
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

const NavigatorStyles = theme => ({
  paper: {
    width: drawerWidth,
  },

  divider: {
    marginTop: theme.spacing(1),
  },
});

const ListItem = theme => ({
  categoryHeader: {
    color: 'rgba(255, 255, 255, 0.7)',
    paddingTop: 16,
    paddingBottom: 16,
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16,
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    paddingLeft: 20,
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
    },
  },
});

const ButtonStyles = theme => ({
  addButton: {
    marginRight: theme.spacing(1),
  },
});

const NotificationStyles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const DraggableStyles = () => ({
  draggable: {
    margin: '4px',
    background: '#eaeff1',
    minHeight: '1px',
    '&:hover': {
      display: 'block',
      border: '1px dashed gray',
    },
  },
  flatDraggable: {
    background: '#eaeff1',
    padding: 1,
  },
});

const TableEditorStyles = () => ({
  table: {
    '@global': {
      tr: {
        height: '30px',
      },
    },
  },
  trEditor: {
    '@global': {
      'td:last-child': {
        'padding-right': '4px',
      },
      'td:last-child svg': {
        display: 'none',
      },
    },
    '&:hover': {
      '@global': {
        'td:last-child svg': {
          display: 'block',
        },
      },
    },
  },
  trDefault: {
    '@global': {
      'td:first-child': {
        width: '40px',
      },
      'td:first-child svg': {
        cursor: 'pointer',
      },
    },
  },
});

const AutoSuggestStyles = theme => ({
  input: {
    display: 'flex',
    padding: '10px 0px',
  },
  valueContainer: {
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    height: 24,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    // position: 'absolute',
    zIndex: 999,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

const TabStyles = () => ({
  mainContent: {
    flex: 1,
    padding: '36px 10px 0',
    background: '#eaeff1',
  },
});

const FormDialogStyles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export const withBasicFormStyles = component => withStyles(BasicStyles)(component);

export const withLayoutStyles = component => withStyles(LayoutStyles)(component);

export const withNavigatorStyles = component => withStyles(NavigatorStyles)(component);

export const withButtonStyles = component => withStyles(ButtonStyles)(component);

export const withNotificationStyles = component => withStyles(NotificationStyles)(component);

export const withDraggableStyles = component => withStyles(DraggableStyles)(component);

export const useTableStyles = makeStyles(TableEditorStyles);

export const withTabStyles = component => withStyles(TabStyles)(component);

export const withAutoSuggestStyles = (component, option) =>
  withStyles(AutoSuggestStyles, option)(component);

export const withFormDialogStyles = component => withStyles(FormDialogStyles)(component);

export const makeListItemStyles = makeStyles(ListItem);
