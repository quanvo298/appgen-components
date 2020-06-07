import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import GridEditorComponent from './GridEditorComponent';

const GridEditor = React.forwardRef((props, ref) => {
  const { label, variant = 'outlined', ...restProps } = props;
  return (
    <FormControl fullWidth variant={variant}>
      {label && <InputLabel shrink>{label}</InputLabel>}
      <GridEditorComponent variant={variant} label={label} {...restProps} forwardRef={ref} />
    </FormControl>
  );
});

export default GridEditor;
