import React, { Component } from 'react';
import { withBasicFormStyles } from '../../utils/withBasicStyles';
import { ModeFormType } from '../../utils/constant';
import { usePolyglot } from '../../utils/LocalProvider';
import DeleteConfirmDialog from '../Dialog/DeleteConfirmDialog';
import BasicBoxWidget from '../BasicBoxWidget/BasicBoxWidget';
import { getEntityId } from '../../helper/ModelHelper';
import ToolbarButton from '../Toolbar/ToolbarButton';
import BaseFormProperties from './BasicFormProperties';

const ButtonsBox = ({ supportNew, supportDelete, handleAdd, handleDelete, toolbarButtons }) => {
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
  if (toolbarButtons) {
    cloneToolbarButtons = [...cloneToolbarButtons, ...toolbarButtons];
  }
  return <ToolbarButton toolbarButtons={cloneToolbarButtons} />;
};

class BasicFormWidget extends Component {
  constructor(props) {
    super(props);
    this.deleteDialogRef = React.createRef();
    this.baseFormPropertiesRef = React.createRef();
    this.state = {
      modeForm: ModeFormType.NEW,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { selectedItem } = props;
    const { modeForm } = state;
    const newModeForm =
      selectedItem && getEntityId(selectedItem) ? ModeFormType.UPDATE : ModeFormType.NEW;
    if (modeForm !== newModeForm)
      return {
        modeForm: newModeForm,
      };

    return null;
  }

  markNew = () => {
    this.props.onAddNew();
  };

  markDelete = () => {
    this.deleteDialogRef.current.show();
  };

  makeSureDelete = () => {
    const { onDelete, selectedItem } = this.props;
    onDelete(selectedItem);
    this.deleteDialogRef.current.close();
  };

  doDelete = () => {
    const { disableDelete, onDelete } = this.props;
    const { modeForm } = this.state;
    return disableDelete ? false : onDelete && modeForm === ModeFormType.UPDATE;
  };

  doAdd = () => {
    const { onAddNew } = this.props;
    return onAddNew;
  };

  getBaseFormPropertiesRef = () => this.baseFormPropertiesRef.current;

  getFormElement = elementName => this.getBaseFormPropertiesRef().formElementsRef[elementName];

  render() {
    const { classes, title, toolbarButtons } = this.props;
    const { modeForm } = this.state;
    const supportDelete = this.doDelete();
    const supportNew = this.doAdd();
    const ButtonsBoxInstance = (
      <ButtonsBox
        supportNew={supportNew}
        supportDelete={supportDelete}
        handleAdd={this.markNew}
        handleDelete={this.markDelete}
        toolbarButtons={toolbarButtons}
      />
    );
    return (
      <BasicBoxWidget title={title} buttonsBox={ButtonsBoxInstance}>
        <BaseFormProperties
          {...this.props}
          modeForm={modeForm}
          classes={classes}
          ref={this.baseFormPropertiesRef}
        />
        <DeleteConfirmDialog onConfirm={this.makeSureDelete} ref={this.deleteDialogRef} />
      </BasicBoxWidget>
    );
  }
}

export default withBasicFormStyles(BasicFormWidget);
