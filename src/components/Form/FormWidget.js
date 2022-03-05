import React, { useEffect } from 'react';
import { withBasicFormStyles } from '../../hocs/withBasicStyles';
import DeleteConfirmDialog from '../Dialog/DeleteConfirmDialog';
import useFormWidget from './hooks/useFormWidget';
import { isUpdatedForm, reduceSelectedItem } from '../../helper/FormHelper';
import ButtonBox from './ButtonBox';
import FormBox from './Layout/FormBox';
import FormLayout from './Layout/FormLayout';
import { useDialogCtx } from '../../hocs/DialogProvider';
import { isUpdated } from '../../helper/ModelHelper';
import { ModeFormType } from '../../utils/constant';

const getModelForm = selectedItem =>
  isUpdated(selectedItem) ? ModeFormType.UPDATE : ModeFormType.NEW;

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
  onReset,
  onAfterSaved,
  showNewButton = true,
}) => {
  const modeForm = getModelForm(selectedItem);

  const {
    reset: resetForm,
    save,
    onFieldChange,
    setFormValues,
    getFormValues,
    getFieldErrors,
    getFormConfig,
    getFormIntegrations,
  } = useFormWidget({
    formName,
    onAction: modeForm === ModeFormType.UPDATE ? onUpdate : onSave,
    onSave,
    onAfterSaved,
  });

  useEffect(() => {
    if (selectedItem) {
      const { reduceSelectedItem: callbackReduceSelectedItem } = getFormIntegrations();
      const item = reduceSelectedItem({ selectedItem })(callbackReduceSelectedItem);
      setFormValues(item);
    } else {
      resetForm();
    }
  }, [selectedItem]);

  const formConfig = getFormConfig();

  const { title, formLayout, fields = {}, disableSave, disableDelete, disableReset } = formConfig;

  const { openDialog } = useDialogCtx();

  const enableSave = () => {
    if (isUpdatedForm(modeForm)) {
      return Boolean(onUpdate);
    }

    return !!onSave;
  };

  const doReset = () => !disableReset;

  const makeSureDelete = () => {
    onDelete(selectedItem);
  };

  const handleSave = () => save();

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
    resetForm();
  };

  const HeaderButtonsBoxInstance = (
    <ButtonBox
      supportNew={showNewButton && Boolean(onAddNew)}
      supportDelete={disableDelete ? false : onDelete && isUpdatedForm(modeForm)}
      handleAdd={onAddNew}
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
      supportSave={enableSave()}
      saveOpts={{ disabled: disableSave }}
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
