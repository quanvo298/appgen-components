"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemByName = exports.isEmpty = exports.isNotEmpty = void 0;

var isNotEmpty = function isNotEmpty(collections) {
  return collections && collections.length > 0;
};

exports.isNotEmpty = isNotEmpty;

var isEmpty = function isEmpty(collections) {
  return !isNotEmpty(collections);
};

exports.isEmpty = isEmpty;

var getItemByName = function getItemByName(itemValue) {
  var itemName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
  var itemList = arguments.length > 2 ? arguments[2] : undefined;
  return itemValue && itemList && itemList.find(function (l) {
    return l[itemName] === itemValue;
  });
};

exports.getItemByName = getItemByName;