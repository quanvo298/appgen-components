import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { defaultFunc } from '../../utils/props';

const DateTimeInput = React.forwardRef((props, ref) => {
  const {
    optionEmpty,
    options,
    type,
    component,
    label,
    name,
    value,
    error,
    disabled,
    onInputChange = defaultFunc,
    variant = 'outlined',
    ref: propRef,
    ...restProps
  } = props;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant={variant}
        format="MM/dd/yyyy"
        label={label}
        value={value}
        fullWidth
        error={error}
        disabled={disabled}
        onChange={onInputChange}
        ref={propRef || ref}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        {...restProps}
      />
    </MuiPickersUtilsProvider>
  );
});

export default DateTimeInput;
