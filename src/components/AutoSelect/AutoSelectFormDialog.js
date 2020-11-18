import React, { useState, Fragment, useRef } from 'react';
import FormDialog from '../Dialog/FormDialog';
import AutoSelect from './AutoSelect';
import { defaultFunc } from '../../utils/props';

const AutoSelectFormDialog = ({
  component: propComponent = {},
  multi,
  value: propValue,
  onChange = defaultFunc,
  name,
  label,
  error,
  disabled,
  required,
  variant = 'outlined',
  convertItemToOption,
}) => {
  const componentRef = useRef(propComponent);
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(propValue);

  const handleAddIconClick = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleAfterSaved = dataSaved => {
    if (dataSaved) {
      const { data = [] } = componentRef.current;
      const option = convertItemToOption ? convertItemToOption(dataSaved) : dataSaved;
      data.push(option);
      componentRef.current = { ...componentRef.current, data };
      setValue(option.value);
    }
    setOpenDialog(false);
  };

  const handleChange = event => {
    const { value: eventValue } = event.target;
    setValue(eventValue);
    onChange(event);
  };

  const { formDialog: FormDialogComponent, formDialogTitle } = propComponent.config;
  const displayFormDialog = openDialog && FormDialogComponent;

  return (
    <Fragment>
      <AutoSelect
        component={componentRef.current}
        multi={multi}
        value={value}
        onChange={handleChange}
        name={name}
        label={label}
        error={error}
        disabled={disabled}
        required={required}
        variant={variant}
        onIconClick={handleAddIconClick}
        showIcon
      />
      {displayFormDialog && (
        <FormDialog title={formDialogTitle} open={openDialog} onClose={handleCloseModal}>
          <FormDialogComponent onAfterFormSaved={handleAfterSaved} />
        </FormDialog>
      )}
    </Fragment>
  );
};

export default AutoSelectFormDialog;
