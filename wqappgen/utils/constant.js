"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SearchOperation = exports.PropertyDataType = exports.BaiscFormPropertyComponentType = exports.NotificationKind = exports.ModeFormType = exports.TABLE_MODE = void 0;
var TABLE_MODE = {
  View: 'view',
  Edit: 'edit'
};
exports.TABLE_MODE = TABLE_MODE;
var ModeFormType = {
  NEW: 1,
  UPDATE: 2,
  DELETE: 3
};
exports.ModeFormType = ModeFormType;
var NotificationKind = {
  Success: 'success',
  Warning: 'warning',
  Info: 'info',
  Error: 'error',
  Danger: 'danger'
};
exports.NotificationKind = NotificationKind;
var BaiscFormPropertyComponentType = {
  Grid: 'grid'
};
exports.BaiscFormPropertyComponentType = BaiscFormPropertyComponentType;
var PropertyDataType = {
  Boolean: 'boolean',
  Number: 'number',
  ArrayObject: 'arrayObject'
};
exports.PropertyDataType = PropertyDataType;
var SearchOperation = {
  Equal: 'equal',
  NotEqual: 'not equal'
};
exports.SearchOperation = SearchOperation;
var _default = ModeFormType;
exports.default = _default;