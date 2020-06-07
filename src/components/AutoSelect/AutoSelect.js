import React, { useRef } from 'react';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { defaultFunc } from '../../utils/props';

const getSelectedOption = (options, multi, autoSelectValue) => {
  if (options && autoSelectValue && multi) {
    return options.filter(({ value }) => autoSelectValue.includes(value));
  }

  if (options && autoSelectValue) {
    return options.find(({ value }) => autoSelectValue === value) || null;
  }

  return multi ? [] : null;
};

const convertToOptions = (component = {}) => {
  const { data = [] } = component;
  return data.reduce((jsonArray, element) => {
    jsonArray.push({
      value: element[component.valueAtt || 'value'],
      label: element[component.labelAtt || 'label'],
    });
    return jsonArray;
  }, []);
};

const AutoSelect = ({ component, multi, value, onChange = defaultFunc, ...props }) => {
  const autoSelectRef = useRef(null);
  const options = convertToOptions(component);
  const defaultValue = getSelectedOption(options, multi, value);

  const handleChange = (event, itemValue) => {
    const targetValue =
      itemValue && multi ? itemValue.map(item => item.value) : itemValue && itemValue.value;
    const target = {
      target: { value: targetValue, selectItem: itemValue },
    };
    onChange(target);
  };

  return (
    <MUIAutocomplete
      multiple={multi}
      filterSelectedOptions
      options={options}
      getOptionLabel={option => option.label}
      fullWidth
      value={defaultValue}
      onChange={handleChange}
      renderInput={params => (
        <TextField
          {...params}
          variant="outlined"
          label={props.label}
          placeholder="Search element (start with a)"
        />
      )}
      ref={autoSelectRef}
      {...props}
    />
  );
};

export default AutoSelect;
