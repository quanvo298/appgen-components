import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import GridEditorComponent from './GridEditorComponent';

const GridEditor = React.forwardRef((props, ref) => {
  const { label, variant = 'outlined', error, required, ...restProps } = props;
  return (
    <FormControl fullWidth variant={variant} required error={error}>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <GridEditorComponent
        variant={variant}
        label={label}
        required={required}
        {...restProps}
        forwardRef={ref}
        error={error}
      />
    </FormControl>
  );
});

export default GridEditor;
