import React, { Fragment, useEffect, useState } from 'react';
import FormDialog from '../Dialog/FormDialog';
import { defaultFunc } from '../../utils/props';
import AutoSelectEditor from './AutoSelectEditor';

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
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(propValue);

  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleAddIconClick = () => {
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  const handleAfterSaved = dataSaved => {
    if (dataSaved && propComponent) {
      const { data = [] } = propComponent;
      const option = convertItemToOption ? convertItemToOption(dataSaved) : dataSaved;
      data.push(option);
      setValue(option.value);
    }
    setOpenDialog(false);
  };

  const { formDialog: FormDialogComponent, formDialogTitle } = propComponent.config;
  const displayFormDialog = openDialog && FormDialogComponent;

  return (
    <Fragment>
      <AutoSelectEditor
        component={propComponent}
        multi={multi}
        value={value}
        onChange={onChange}
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
          <FormDialogComponent onAfterSaved={handleAfterSaved} />
        </FormDialog>
      )}
    </Fragment>
  );
};

export default AutoSelectFormDialog;
