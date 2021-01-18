import React from 'react';
import { withBasicFormStyles } from '../../utils/withBasicStyles';
import DeleteConfirmDialog from '../Dialog/DeleteConfirmDialog';
import { getEntityId } from '../../helper/ModelHelper';
import useForm from './hooks/useForm';
import { isUpdatedForm } from '../../helper/BasicFormHelper';
import ButtonBox from './ButtonBox';
import FormBox from './Layout/FormBox';
import FormLayout from './Layout/FormLayout';
import { useDialogCtx } from '../../hocs/DialogProvider';

const FormWidget = ({
  formConfig,
  selectedItem,
  classes,
  showTitle = true,
  toolbarButtons = [],
  formToolbarButtons = [],
  onSave,
  onDelete,
  onAddNew,
  onUpdate,
}) => {
  const {
    title,
    layout,
    formName,
    fields = {},
    disableSave,
    disableDelete,
    disableReset,
  } = formConfig;

  const { reset, modeForm, onFieldChange, getFormValues, save, getFieldErrors } = useForm({
    selectedItem,
    onUpdate,
    onSave,
  });

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
          layout={layout}
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
