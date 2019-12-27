import { SearchOperation } from 'utils/constant';

export const ENTITY_PROPERTIES_SYSTEM = {
  ID: 'id',
  UNDER_ID: '_id',
  ENTITY: 'Entity',
  CHOICELIST: 'ChoiceList',
};

export const isUpdated = item =>
  item && (item[ENTITY_PROPERTIES_SYSTEM.ID] || item[ENTITY_PROPERTIES_SYSTEM.UNDER_ID]);

export const isNew = item => !isUpdated(item);

export const getEntityId = entity =>
  entity && (entity[ENTITY_PROPERTIES_SYSTEM.ID] || entity[ENTITY_PROPERTIES_SYSTEM.UNDER_ID]);

export const getItemById = (itemId, itemList = []) =>
  itemId &&
  itemList.find(item => item.id === itemId || item[ENTITY_PROPERTIES_SYSTEM.UNDER_ID] === itemId);

export const checkValueBaseOnCriteria = (criteria, item, key) => {
  const criteriaValue = criteria[key];
  if (criteriaValue instanceof Object) {
    const { value, operation } = criteriaValue;
    const correctOperation =
      operation && Object.values(SearchOperation).includes(operation)
        ? operation
        : SearchOperation.Equal;
    switch (correctOperation) {
      case SearchOperation.NotEqual:
        return item[key] !== value;
      default:
        return item[key] === value;
    }
  }
  return item[key] === criteriaValue;
};

export function getItemsFromListByCriteria(criteria, itemList = []) {
  const result = [];
  if (criteria) {
    itemList.forEach(item => {
      let matchAll = true;
      Object.keys(criteria).forEach(key => {
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

export function getOneItemFromListByCriteria(criteria, itemList) {
  const result = getItemsFromListByCriteria(criteria, itemList);
  return result && result.length > 0 && result[0];
}

export function updateItemFromList(item, idValue, list, idProp) {
  const idPropName = idProp || ENTITY_PROPERTIES_SYSTEM.ID;
  for (let index = 0; index < list.length; index++) {
    const itemFromList = list[index];
    if (itemFromList[idPropName] === idValue) {
      list[index] = item;
      break;
    }
  }
}

export function deleteItemFromList(idValue, list, idProp) {
  const idPropName = idProp || ENTITY_PROPERTIES_SYSTEM.ID;
  for (let index = 0; index < list.length; index++) {
    const itemFromList = list[index];
    if (itemFromList[idPropName] === idValue) {
      list.splice(index, 1);
      break;
    }
  }
}
