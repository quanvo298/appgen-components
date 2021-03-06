import React, { useRef } from 'react';
import { withBasicFormStyles } from '../../utils/withBasicStyles';
import { ModeFormType } from '../../utils/constant';
import { usePolyglot } from '../../utils/LocaleProvider';
import DeleteConfirmDialog from '../Dialog/DeleteConfirmDialog';
import BasicBoxWidget from '../BasicBoxWidget/BasicBoxWidget';
import ToolbarButton from '../Toolbar/ToolbarButton';
import BasicFormLayout from './BasicFormLayout';
import { getEntityId } from '../../helper/ModelHelper';
import useBasicForm from '../../hooks/useBasicForm';
import { isUpdatedForm } from '../../helper/BasicFormHelper';

const ButtonsBox = ({
  supportNew,
  supportDelete,
  handleAdd,
  handleDelete,
  supportSave,
  supportReset,
  onSave,
  onReset,
  toolbarButtons,
}) => {
  const polyglot = usePolyglot();
  let cloneToolbarButtons = [];
  if (supportNew) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.new'),
      onClick: handleAdd,
    });
  }
  if (supportDelete) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.delete'),
      onClick: handleDelete,
      color: 'secondary',
    });
  }
  if (supportSave) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.save'),
      onClick: onSave,
      variant: 'contained',
    });
  }
  if (supportReset) {
    cloneToolbarButtons.push({
      label: polyglot.t('btn.reset'),
      onClick: onReset,
      color: 'default',
    });
  }
  if (toolbarButtons) {
    cloneToolbarButtons = [...toolbarButtons, ...cloneToolbarButtons];
  }
  return <ToolbarButton toolbarButtons={cloneToolbarButtons} />;
};

const BasicFormWidget = ({
  selectedItem,
  classes,
  title,
  showTitle = true,
  toolbarButtons,
  formToolbarButtons = [],
  FormComponentLayout,
  elements,
  disableDelete,
  onDelete,
  onAddNew,
  onUpdate,
  disableSave,
  onSave,
  disableReset,
  onCellChange,
  onGetCellDefinition,
}) => {
  const deleteDialogRef = useRef(null);
  const { addFormElementRef, getValues, reset, save, onChange, modeForm } = useBasicForm({
    selectedItem,
    elements,
    onUpdate,
    onSave,
  });

  const doDelete = () => (disableDelete ? false : onDelete && modeForm === ModeFormType.UPDATE);

  const doAdd = () => onAddNew;

  const markNew = () => {
    onAddNew();
  };

  const markDelete = () => {
    deleteDialogRef.current.show();
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
    deleteDialogRef.current.close();
  };

  const handleSave = () => save();

  const handleReset = () => reset();

  const HeaderButtonsBoxInstance = (
    <ButtonsBox
      supportNew={doAdd()}
      supportDelete={doDelete()}
      handleAdd={markNew}
      handleDelete={markDelete}
      toolbarButtons={toolbarButtons}
    />
  );

  const FormActionButtonsBoxInstance = (
    <ButtonsBox
      supportSave={doSave()}
      supportReset={doReset()}
      onSave={handleSave}
      onReset={handleReset}
      toolbarButtons={formToolbarButtons}
    />
  );

  return (
    <form autoComplete="off" noValidate>
      <BasicBoxWidget
        title={title}
        showTitle={showTitle}
        headerActions={HeaderButtonsBoxInstance}
        cardActions={FormActionButtonsBoxInstance}
      >
        <BasicFormLayout
          classes={classes}
          FormComponentLayout={FormComponentLayout}
          elements={elements}
          onInputChange={onChange}
          onCellChange={onCellChange}
          onGetCellDefinition={onGetCellDefinition}
          elementsValue={getValues()}
          addFormElementRef={addFormElementRef}
        />
      </BasicBoxWidget>
      <DeleteConfirmDialog onConfirm={makeSureDelete} ref={deleteDialogRef} />
    </form>
  );
};

export default withBasicFormStyles(BasicFormWidget);
