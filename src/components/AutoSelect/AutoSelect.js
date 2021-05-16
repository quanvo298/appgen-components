import React from 'react';
import MUIAutocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { defaultFunc } from '../../utils/props';
import Row from '../Container/Row';
import Wrapper from '../Container/Wrapper';
import MaterialIcon from '../Icon/MaterialIcon';

const getSelectedOption = (itemValue, options = [], multiple) => {
  if (options.length && itemValue && multiple) {
    return options.filter(({ value }) => itemValue.includes(value));
  }

  if (options.length && itemValue) {
    return options.find(({ value }) => itemValue === value) || null;
  }

  return multiple ? [] : null;
};

const AutoSelect = ({
  options = [],
  multiple,
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
  return (
    <Row width={1}>
      <MUIAutocomplete
        multiple={multiple}
        filterSelectedOptions
        options={options}
        getOptionLabel={option => (option ? option.label : '') || ''}
        fullWidth
        value={getSelectedOption(value, options, multiple)}
        onChange={onChange}
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
