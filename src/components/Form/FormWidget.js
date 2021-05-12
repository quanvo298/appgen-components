import React from 'react';
import { withBasicFormStyles } from '../../hocs/withBasicStyles';
import DeleteConfirmDialog from '../Dialog/DeleteConfirmDialog';
import { getEntityId } from '../../helper/ModelHelper';
import useFormWidget from './hooks/useFormWidget';
import { isUpdatedForm } from '../../helper/FormHelper';
import ButtonBox from './ButtonBox';
import FormBox from './Layout/FormBox';
import FormLayout from './Layout/FormLayout';
import { useDialogCtx } from '../../hocs/DialogProvider';

const FormWidget = ({
  formName,
  selectedItem,
  classes,
  showTitle = true,
  toolbarButtons = [],
  formToolbarButtons = [],
  onSave,
  onDelete,
  onAddNew,
  onUpdate,
  onAfterSaved,
}) => {
  const {
    modeForm,
    reset,
    save,
    onFieldChange,
    getFormValues,
    getFieldErrors,
    getFormConfig,
  } = useFormWidget({
    formName,
    selectedItem,
    onUpdate,
    onSave,
    onAfterSaved,
  });

  const formConfig = getFormConfig();

  const { title, formLayout, fields = {}, disableSave, disableDelete, disableReset } = formConfig;

  const { openDialog } = useDialogCtx();

  const doDelete = () => {
    return disableDelete ? false : onDelete && isUpdatedForm(modeForm);
  };

  const doAdd = () => onAddNew;

  const markNew = () => {
    onAddNew();
  };

  const doSave = () => {
    if (disableSave) {
      return false;
    }

    if (isUpdatedForm(modeForm)) {
      const id = getEntityId(selectedItem);
      return onUpdate && id !== -1;
    }

    return !!onSave;
  };

  const doReset = () => !disableReset;

  const makeSureDelete = () => {
    onDelete(selectedItem);
  };

  const handleSave = () => save();

  const handleReset = () => reset();

  const HeaderButtonsBoxInstance = (
    <ButtonBox
      supportNew={doAdd()}
      supportDelete={doDelete()}
      handleAdd={markNew}
      handleDelete={() => {
        openDialog(DeleteConfirmDialog, {
          onConfirm: makeSureDelete,
        });
      }}
      toolbarButtons={toolbarButtons}
    />
  );

  const FormActionButtonsBoxInstance = (
    <ButtonBox
      supportSave={doSave()}
      supportReset={doReset()}
      onSave={handleSave}
      onReset={handleReset}
      toolbarButtons={formToolbarButtons}
    />
  );

  return (
    <form autoComplete="off" noValidate name={formName}>
      <FormBox
        title={title}
        showTitle={showTitle}
        headerActions={HeaderButtonsBoxInstance}
        cardActions={FormActionButtonsBoxInstance}
      >
        <FormLayout
          classes={classes}
          layout={formLayout}
          fields={fields}
          formValues={getFormValues()}
          fieldErrors={getFieldErrors()}
          onFieldChange={onFieldChange}
        />
      </FormBox>
    </form>
  );
};

export default withBasicFormStyles(FormWidget);
