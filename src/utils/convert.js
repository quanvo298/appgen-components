export const convertToOption = ({ item, value = 'id', label = 'name' }) => {
  return { value: item[value], label: item[label] };
};

export const convertToOptions = ({ list = [], value = 'id', label = 'name' }) => {
  return list.map(item => convertToOption({ item, value, label }));
};
