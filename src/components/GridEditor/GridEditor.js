import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import GridEditorComponent from './GridEditorComponent';

const GridEditor = React.forwardRef((props, ref) => {
  const { label, variant = 'outlined', required, ...restProps } = props;
  return (
    <FormControl fullWidth variant={variant} required>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <GridEditorComponent
        variant={variant}
        label={label}
        required={required}
        {...restProps}
        forwardRef={ref}
      />
    </FormControl>
  );
});

export default GridEditor;
