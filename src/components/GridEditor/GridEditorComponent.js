import React from 'react';
import { mergeClasses } from '@material-ui/styles';
import { OutlinedInput, FilledInput, Input } from '@material-ui/core';
import TableEditable from '../Table/TableEditable';
import { TABLE_MODE } from '../../utils/constant';

const TableEditableComponent = React.forwardRef(function TableEditableComponent(props, ref) {
  const {
    children,
    component,
    name,
    value,
    label,
    forwardRef,
    inputRef,
    onInputChange,
    onCellChange,
    onGetCellDefinition,
    required,
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
      required={required}
      onChange={onInputChange(name)}
      onCellChange={onCellChange}
      onGetCellDefinition={onGetCellDefinition}
    />
  );
});

const GridEditorComponent = React.forwardRef((props, ref) => {
  const {
    classes,
    component,
    name,
    objectValue,
    label,
    error,
    disabled,
    required,
    variant = 'outlined',
    inputProps,
    labelProps,
    onInputChange,
    onCellChange,
    onGetCellDefinition,
    labelWidth = 0,
    forwardRef,
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
      value: objectValue,
      onInputChange,
      onCellChange,
      required,
      onGetCellDefinition,
      forwardRef,
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

export default GridEditorComponent;
