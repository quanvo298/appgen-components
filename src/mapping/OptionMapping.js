export const convertToOptionItem = item => {
  if (item) {
    const { id: value, name: label } = item;
    return {
      value,
      label,
    };
  }
  return item;
};

export const convertToOptionItems = (items = []) => items.map(item => convertToOptionItem(item));
