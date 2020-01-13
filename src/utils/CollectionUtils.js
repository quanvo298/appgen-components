export const isNotEmpty = collections => collections && collections.length > 0;

export const isEmpty = collections => !isNotEmpty(collections);

export const getItemByName = (itemValue, itemName = 'name', itemList) =>
  itemValue && itemList && itemList.find(l => l[itemName] === itemValue);

export const convertToMapByName = (elements, itemName = 'name') =>
  elements.reduce((jsonMap, element) => {
    jsonMap[element[itemName]] = element;
    return jsonMap;
  }, {});
