import { defaultFunc } from '../../../utils/props';
import { isNotEmpty } from '../../../utils';
import { sortItemsByName } from '../../../helper/ModelHelper';

const DefaultEvents = {
  onDeleteRow: defaultFunc,
  onCellChange: defaultFunc,
  onSelectedRow: defaultFunc,
  onRenderedRow: defaultFunc,
};

export const OrderedColumnNameDefault = '_rowNo';

const GridContext = ({
  name: componentName,
  columns: propColumns,
  gridData: propGridData = [],
  mode: propMode,
  events: propEvents = {},
  eventEmitters: propEventEmitters = {},
  ordered: { support, columnName } = { support: false, columnName: OrderedColumnNameDefault },
}) => {
  const initialGridData = propGridData != null ? propGridData : [];
  const columns =
    propColumns != null && support
      ? sortItemsByName({ items: propColumns, fieldName: columnName })
      : propColumns;

  const properties = {
    columns,
    mode: propMode,
    gridData: initialGridData,
    gridRows: [],
    customRows: [...new Array(initialGridData.length)],
    events: { ...DefaultEvents, ...propEvents },
    eventEmitters: propEventEmitters,
    ordered: { support, columnName },
    integrations: {
      reduceCellDefs: defaultFunc(),
    },
  };

  const getIntegrations = () => properties.integrations;

  const addIntegrations = (events = {}) => {
    const { integrations } = properties;
    Object.keys(events).forEach(eventName => {
      integrations[eventName] = events[eventName];
    });
  };

  const onEventEmitters = newEvents => {
    const { eventEmitters } = properties;
    Object.keys(newEvents).forEach(eventName => {
      eventEmitters[eventName] = newEvents[eventName];
    });
  };

  const emitEvent = (eventName, payload) => {
    const { eventEmitters } = properties;
    const callback = eventEmitters[eventName];
    if (callback) {
      return callback(payload);
    }
    return null;
  };

  const getEvents = () => {
    return properties.events;
  };

  const addGridEvents = newEvents => {
    const { events } = properties;
    if (newEvents) {
      Object.keys(newEvents).forEach(eventName => {
        events[eventName] = newEvents[eventName];
      });
    }
  };

  const supportOrdered = () => {
    const { ordered: propOrder = {} } = properties;
    return Boolean(propOrder.support);
  };

  const getOrderedColumnName = () => {
    const { ordered: propOrder = {} } = properties;
    return propOrder.columnName || OrderedColumnNameDefault;
  };

  const getGridData = () => {
    const { gridData } = properties;
    if (supportOrdered() && isNotEmpty(gridData)) {
      const orderedColumnName = getOrderedColumnName();
      gridData.forEach((item, index) => {
        item[orderedColumnName] = index;
      });
    }
    return gridData;
  };
  const setGridData = data => {
    properties.gridData = data;
  };
  const addGridRowData = rowData => {
    properties.gridData.push(rowData);
  };

  const getRowsNo = () => properties.gridData.length;

  const getMode = () => properties.mode;
  const setMode = data => {
    properties.mode = data;
  };

  const getColumns = () => properties.columns;
  const getGridRow = rowIndex => {
    return properties.gridRows[rowIndex];
  };

  const getGridRowData = rowIndex => {
    const { gridData } = properties;
    return gridData && gridData.length > rowIndex ? gridData[rowIndex] : null;
  };

  const setGridRowData = (rowIndex, rowData) => {
    const { gridData } = properties;
    if (gridData && gridData.length) {
      gridData[rowIndex] = rowData;
    }
  };

  const deleteGridRow = rowIndex => {
    const { gridData, gridRows } = properties;
    if (gridRows.length > rowIndex) {
      gridRows.splice(rowIndex, 1);
    }
    if (gridData.length > rowIndex) {
      gridData.splice(rowIndex, 1);
    }
  };

  const clearGridRows = () => {
    delete properties.gridRows;
    properties.gridRows = [];
  };

  const addGridRow = (rowIndex, gridRow) => {
    const { gridRows } = properties;
    if (gridRows.length < rowIndex) {
      gridRows.push(gridRow);
    } else {
      gridRows[rowIndex] = gridRow;
    }
  };

  const setCustomRow = (rowIndex, customRow) => {
    if (customRow != null) {
      const { customRows } = properties;
      customRows[rowIndex] = customRow;
    }
  };

  const getCustomRowColumns = rowIndex => {
    const customRow = properties.customRows[rowIndex];
    return customRow ? customRow.cells : [];
  };

  const getCustomRowConfig = rowIndex => {
    return properties.customRows[rowIndex];
  };

  const setProperties = (newProperties = {}) => {
    Object.keys(newProperties).forEach(key => {
      switch (key) {
        case 'gridData':
          setGridData(newProperties.gridData);
          break;
        case 'mode':
          setMode(newProperties.mode);
          break;
        default:
          break;
      }
    });
  };

  return {
    componentName,
    getColumns,
    getMode,
    supportOrdered,
    getOrderedColumnName,
    getRowsNo,
    getGridData,
    addGridRowData,
    deleteGridRow,
    getGridRow,
    addGridRow,
    getGridRowData,
    setGridRowData,
    clearGridRows,
    setCustomRow,
    getCustomRowColumns,
    getCustomRowConfig,
    setProperties,
    getEvents,
    addGridEvents,
    onEventEmitters,
    emitEvent,
    getIntegrations,
    addIntegrations,
  };
};

export default GridContext;
