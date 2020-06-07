import React from 'react';
import { mergeClasses } from '@material-ui/styles';
import { OutlinedInput, FilledInput, Input } from '@material-ui/core';
import TableEditable from '../Table/TableEditable';
import { TABLE_MODE } from '../../utils/constant';
import { defaultFunc } from '../../utils/props';

const TableEditableComponent = React.forwardRef(function TableEditableComponent(props, ref) {
  const {
    children,
    component,
    name,
    value,
    onInputChange = defaultFunc,
    label,
    forwardRef,
    inputRef,
    onCellChange,
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
      ref={forwardRef || ref}
      inputProps={inputProps}
      onChange={onInputChange(name)}
      onCellChange={onCellChange}
    />
  );
});

const GridEditorComponent = React.forwardRef((props, ref) => {
  const {
    children,
    classes,
    component,
    name,
    value = [],
    onInputChange = defaultFunc,
    label,
    variant = 'outlined',
    inputProps,
    labelWidth = 0,
    onCellChange,
    forwardRef,
    ...restProps
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
      onInputChange,
      onCellChange,
      forwardRef,
      placeholder: label,
      defaultValue: label,
      ...inputProps,
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
    ...restProps,
  });
});

export default GridEditorComponent;
