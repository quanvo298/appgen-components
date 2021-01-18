import { defaultFunc } from '../../../utils/props';

const DefaultEvents = {
  onDeleteRow: defaultFunc,
  onCellChange: defaultFunc,
  onSelectedRow: defaultFunc,
};

const GridContext = ({
  name: componentName,
  columns: propColumns,
  gridData: propGridData = [],
  mode: propMode,
  events: propEvents = {},
  eventEmitters: propEventEmitters = {},
}) => {
  const initialGridData = propGridData != null ? propGridData : [];

  const properties = {
    columns: propColumns,
    mode: propMode,
    gridData: initialGridData,
    gridRows: [],
    customRowColumns: [...new Array(initialGridData.length)],
    events: { ...DefaultEvents, ...propEvents },
    eventEmitters: propEventEmitters,
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

  const getGridData = () => properties.gridData;
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
      delete gridRows[rowIndex];
      gridRows[rowIndex] = gridRow;
    }
  };

  const setCustomRowColumns = (rowIndex, customColumns) => {
    if (customColumns != null) {
      const { customRowColumns } = properties;
      customRowColumns[rowIndex] = customColumns;
    }
  };

  const getCustomRowColumn = rowIndex => properties.customRowColumns[rowIndex];

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
    getRowsNo,
    getGridData,
    addGridRowData,
    deleteGridRow,
    getGridRow,
    addGridRow,
    clearGridRows,
    setCustomRowColumns,
    getCustomRowColumn,
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
