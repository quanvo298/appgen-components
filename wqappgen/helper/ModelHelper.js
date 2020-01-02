"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItemsFromListByCriteria = getItemsFromListByCriteria;
exports.getOneItemFromListByCriteria = getOneItemFromListByCriteria;
exports.updateItemFromList = updateItemFromList;
exports.deleteItemFromList = deleteItemFromList;
exports.checkValueBaseOnCriteria = exports.getItemById = exports.getEntityId = exports.isNew = exports.isUpdated = exports.ENTITY_PROPERTIES_SYSTEM = void 0;

var _constant = require("../utils/constant");

var ENTITY_PROPERTIES_SYSTEM = {
  ID: 'id',
  UNDER_ID: '_id',
  ENTITY: 'Entity',
  CHOICELIST: 'ChoiceList'
};
exports.ENTITY_PROPERTIES_SYSTEM = ENTITY_PROPERTIES_SYSTEM;

var isUpdated = function isUpdated(item) {
  return item && (item[ENTITY_PROPERTIES_SYSTEM.ID] || item[ENTITY_PROPERTIES_SYSTEM.UNDER_ID]);
};

exports.isUpdated = isUpdated;

var isNew = function isNew(item) {
  return !isUpdated(item);
};

exports.isNew = isNew;

var getEntityId = function getEntityId(entity) {
  return entity && (entity[ENTITY_PROPERTIES_SYSTEM.ID] || entity[ENTITY_PROPERTIES_SYSTEM.UNDER_ID]);
};

exports.getEntityId = getEntityId;

var getItemById = function getItemById(itemId) {
  var itemList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return itemId && itemList.find(function (item) {
    return item.id === itemId || item[ENTITY_PROPERTIES_SYSTEM.UNDER_ID] === itemId;
  });
};

exports.getItemById = getItemById;

var checkValueBaseOnCriteria = function checkValueBaseOnCriteria(criteria, item, key) {
  var criteriaValue = criteria[key];

  if (criteriaValue instanceof Object) {
    var value = criteriaValue.value,
        operation = criteriaValue.operation;
    var correctOperation = operation && Object.values(_constant.SearchOperation).includes(operation) ? operation : _constant.SearchOperation.Equal;

    switch (correctOperation) {
      case _constant.SearchOperation.NotEqual:
        return item[key] !== value;

      default:
        return item[key] === value;
    }
  }

  return item[key] === criteriaValue;
};

exports.checkValueBaseOnCriteria = checkValueBaseOnCriteria;

function getItemsFromListByCriteria(criteria) {
  var itemList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var result = [];

  if (criteria) {
    itemList.forEach(function (item) {
      var matchAll = true;
      Object.keys(criteria).forEach(function (key) {
        if (matchAll && !(item && checkValueBaseOnCriteria(criteria, item, key))) {
          matchAll = false;
        }
      });

      if (matchAll) {
        result.push(item);
      }
    });
  }

  return result;
}

function getOneItemFromListByCriteria(criteria, itemList) {
  var result = getItemsFromListByCriteria(criteria, itemList);
  return result && result.length > 0 && result[0];
}

function updateItemFromList(item, idValue, list, idProp) {
  var idPropName = idProp || ENTITY_PROPERTIES_SYSTEM.ID;

  for (var index = 0; index < list.length; index++) {
    var itemFromList = list[index];

    if (itemFromList[idPropName] === idValue) {
      list[index] = item;
      break;
    }
  }
}

function deleteItemFromList(idValue, list, idProp) {
  var idPropName = idProp || ENTITY_PROPERTIES_SYSTEM.ID;

  for (var index = 0; index < list.length; index++) {
    var itemFromList = list[index];

    if (itemFromList[idPropName] === idValue) {
      list.splice(index, 1);
      break;
    }
  }
}