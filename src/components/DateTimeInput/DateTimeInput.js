import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { defaultFunc } from '../../utils/props';

const DateTimeInput = React.forwardRef((props, ref) => {
  const {
    label,
    name,
    value,
    error,
    disabled,
    onChange = defaultFunc,
    variant = 'outlined',
    ref: propRef,
  } = props;

  const handleChange = dateValue => {
    onChange({ target: { value: dateValue } });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        name={name}
        disableToolbar
        variant="inline"
        {...(Boolean(variant) && { inputVariant: variant })}
        format="MM/dd/yyyy"
        label={label}
        value={value || null}
        fullWidth
        error={error}
        disabled={disabled}
        onChange={handleChange}
        ref={propRef || ref}
        autoOk
      />
    </MuiPickersUtilsProvider>
  );
});

export default DateTimeInput;
