export const UUID = '_uuid';
export const TABLE_MODE = {
  View: 'view',
  Edit: 'edit',
};

export const ModeFormType = {
  NEW: 1,
  UPDATE: 2,
  DELETE: 3,
};

export const NotificationKind = {
  Success: 'success',
  Warning: 'warning',
  Info: 'info',
  Error: 'error',
  Danger: 'danger',
};

export const FieldType = {
  Text: 'text',
  LongText: 'longText',
  Boolean: 'boolean',
  Number: 'number',
  Date: 'date',
  DateTime: 'datetime-local',
  Object: 'object',
  ArrayObject: 'arrayObject',
};

export const FieldComponentType = {
  Grid: 'grid',
  Map: 'map',
  Select: 'select',
  AutoSelect: 'auto-select',
};

export const SearchOperator = {
  Equal: 'equal',
  EqualsIgnoreCase: 'equalsIgnoreCase',
  NotEqual: 'not equal',
};

export default ModeFormType;
