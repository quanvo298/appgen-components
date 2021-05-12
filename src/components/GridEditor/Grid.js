import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { mergeClasses } from '@material-ui/styles';
import { OutlinedInput, FilledInput, Input } from '@material-ui/core';
import TableEditable from '../Table/TableEditable';
import { TABLE_MODE } from '../../utils/constant';

export const TableEditableComponent = function TableEditableComponent(props) {
  const {
    children,
    component,
    name,
    value,
    label,
    forwardRef,
    inputRef,
    onChange,
    required,
    error,
    ...inputProps
  } = props;

  return (
    <TableEditable
      {...component}
      mode={TABLE_MODE.Edit}
      gridData={value}
      componentName={name}
      disabledDeleted={component.disabledDeleted}
      disabledNew={component.disabledNew}
      inputProps={inputProps}
      required={required}
      onChange={onChange}
      error={error}
    />
  );
};

export const GridComponent = React.forwardRef((props, ref) => {
  const {
    classes,
    component,
    name,
    value,
    label,
    error,
    disabled,
    required,
    variant = 'outlined',
    inputProps,
    labelProps,
    onChange,
    labelWidth = 0,
  } = props;
  const InputComponent = {
    standard: <Input />,
    outlined: <OutlinedInput label={label} labelWidth={labelWidth} />,
    filled: <FilledInput />,
  }[variant];

  const inputComponent = TableEditableComponent;

  return React.cloneElement(InputComponent, {
    inputComponent,
    inputProps: {
      variant,
      type: undefined, // We render a select. We can ignore the type provided by the `Input`.
      component,
      name,
      value,
      onChange,
      required,
      error,
      placeholder: label,
      defaultValue: label,
      ...inputProps,
      ...labelProps,
      classes: inputProps
        ? mergeClasses({
            baseClasses: classes,
            newClasses: inputProps.classes,
          })
        : classes,
    },
    notched: true,
    ref,
    variant,
    error,
    disabled,
    required,
  });
});

const Grid = props => {
  const { label, variant = 'outlined', error, required, ...restProps } = props;
  return (
    <FormControl fullWidth variant={variant} required={required} error={error}>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <GridComponent
        variant={variant}
        label={label}
        required={required}
        {...restProps}
        error={error}
      />
    </FormControl>
  );
};

export default Grid;
