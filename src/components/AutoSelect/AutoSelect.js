import React, { useRef } from 'react';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { defaultFunc } from '../../utils/props';
import Row from '../Container/Row';
import Wrapper from '../Container/Wrapper';
import MaterialIcon from '../Icon/MaterialIcon';
import { isObject } from '../../utils';

const getSelectedOption = (options, multi, itemValue) => {
  const autoSelectValue = itemValue && isObject(itemValue) ? itemValue.value : itemValue;

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

const AutoSelect = ({
  component,
  multi,
  value,
  onChange = defaultFunc,
  name,
  label,
  error,
  disabled,
  required,
  variant = 'outlined',
  onIconClick = defaultFunc,
  showIcon = false,
  iconName = 'Add',
}) => {
  const autoSelectRef = useRef(null);
  const options = convertToOptions(component);
  const defaultValue = getSelectedOption(options, multi, value);

  const handleChange = (event, itemValue) => {
    let targetValue = null;
    if (itemValue) {
      targetValue = multi ? itemValue.map(item => item.value) : itemValue.value;
    }
    const target = {
      target: { value: targetValue, selectItem: itemValue },
    };
    onChange(target);
  };

  return (
    <Row width={1}>
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
            required={required}
            label={label}
            error={error}
            placeholder="Search element (start with a)"
            {...(Boolean(variant) && { variant })}
          />
        )}
        ref={autoSelectRef}
        name={name}
        label={label}
        disabled={disabled}
        required={required}
      />
      {showIcon && (
        <Wrapper mx={2}>
          <MaterialIcon iconName={iconName} onIconClick={onIconClick} />
        </Wrapper>
      )}
    </Row>
  );
};

export default AutoSelect;
