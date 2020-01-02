"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateFromUTC = exports.formatDateLong = exports.DATE_LONG_FORMAT = void 0;

var _dateFns = require("date-fns");

var DATE_LONG_FORMAT = 'dd/MM/yyyy hh:mm:ss';
exports.DATE_LONG_FORMAT = DATE_LONG_FORMAT;

var formatDateLong = function formatDateLong(date) {
  return (0, _dateFns.format)(date, DATE_LONG_FORMAT);
};

exports.formatDateLong = formatDateLong;

var parseDateFromUTC = function parseDateFromUTC(dateUTCStr) {
  return (0, _dateFns.parseISO)(dateUTCStr);
};

exports.parseDateFromUTC = parseDateFromUTC;