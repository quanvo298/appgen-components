import React, { Component } from 'react';
import {
  isUpdatedForm,
  isNewForm,
  validateElements,
  validatePropertyBeforeSaved,
  validateUpdatedItemBeforeSaved,
  checkElementByRegExp,
  processInitialValues,
} from '../../helper/BasicFormHelper';
import withPolyglot from '../../utils/withPolyglot';
import { withBasicFormStyles } from '../../utils/withBasicStyles';
import { createValidatorStrategy } from '../../helper/Validator';
import PubSub, { SUBSCRIPTION } from '../../utils/PubSub';
import { NotificationKind } from '../../utils/constant';
import BasicFormLayout from './BasicFormLayout';

class BasicFormProperties extends Component {
  constructor(props) {
    super(props);
    this.elementFormRefs = {};
    this.state = {
      selectedItem: {},
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { elements, selectedItem } = props;
    const { selectedItem: selectedItemFromState } = state;
    if (selectedItem !== selectedItemFromState) {
      const values = processInitialValues(elements, selectedItem);
      return {
        values,
        selectedItem,
      };
    }
    return null;
  }

  renderElementForm = beforeChanges => {
    const { values: updatedItem } = this.state;
    Object.keys(updatedItem).forEach(elementName => {
      if (updatedItem[elementName] !== beforeChanges[elementName]) {
        const elementFormRef = this.elementFormRefs[elementName];
        elementFormRef.setValue(updatedItem[elementName]);
      }
    });
  };

  onPropertyChange = (name, value) => {
    const { onPropertyChange } = this.props;
    const { values } = this.state;
    if (onPropertyChange) {
      const beforeChanges = { ...values };
      onPropertyChange(name, value, values);
      this.renderElementForm(beforeChanges);
    }
  };

  processAfterPropertyChange = (name, value) => {
    const { onAfterPropertiesChanged } = this.props;
    const { values: updatedItem } = this.state;
    if (onAfterPropertiesChanged) {
      const beforeChanges = { ...updatedItem };
      onAfterPropertiesChanged({ name, value, updatedItem });
      this.renderElementForm(beforeChanges);
    }
  };

  onInputChange = (name, elementValue) => () => {
    const { values } = this.state;
    values[name] = elementValue;
    this.onPropertyChange(name, elementValue);
    this.processAfterPropertyChange(name, elementValue);
  };

  onKeyPress = name => event => {
    const { elements } = this.props;
    if (checkElementByRegExp(elements, name, event.key)) {
      event.preventDefault();
    }
  };

  resetForm = () => {
    const { elements, selectedItem } = this.props;
    const values = processInitialValues(elements, selectedItem);
    this.setState({
      values,
    });
  };

  processOvverideUpdatedItemSaved = updatedItem => {
    const { onOvverideUpdatedItemSaved } = this.props;
    if (onOvverideUpdatedItemSaved) {
      return onOvverideUpdatedItemSaved(updatedItem);
    }
    return updatedItem;
  };

  processOvverideUpdatedItemModified = updatedItem => {
    const { onOvverideUpdatedItemModified } = this.props;
    if (onOvverideUpdatedItemModified) {
      return onOvverideUpdatedItemModified(updatedItem);
    }
    return updatedItem;
  };

  processAfterSaved = updatedItem => {
    const { onAfterSaved } = this.props;
    if (onAfterSaved) {
      onAfterSaved(updatedItem);
    }
  };

  processOvverideUpdatedItem = () => {
    const { modeForm, selectedItem } = this.props;
    const { values } = this.state;
    if (isUpdatedForm(modeForm)) {
      const updatedItem = { ...selectedItem, ...values };
      return this.processOvverideUpdatedItemModified(updatedItem);
    }
    if (isNewForm(modeForm)) {
      return this.processOvverideUpdatedItemSaved(values);
    }
    return values;
  };

  doAddAndSave = updatedItem => {
    const { onUpdate, onSave, modeForm } = this.props;
    if (isUpdatedForm(modeForm)) {
      onUpdate(updatedItem);
      this.processAfterSaved(updatedItem);
    } else if (isNewForm(modeForm)) {
      onSave(updatedItem);
      this.processAfterSaved(updatedItem);
    }
  };

  processErrors = errors => {
    Object.keys(errors).forEach(elementName => {
      if (errors[elementName]) {
        const elementFormRef = this.elementFormRefs[elementName];
        elementFormRef.setError(true);
      }
    });
  };

  addElementFormRef = elementFormRef => {
    if (elementFormRef) {
      const { props } = elementFormRef;

      if (props) {
        const { name } = props;
        this.elementFormRefs[name] = elementFormRef;
      }
    }
  };

  proceedValidateItem = callback => {
    const {
      elements,
      onValidateUpdatedItemBeforeSaved,
      onValidatePropertyBeforeSaved,
      polyglot,
    } = this.props;
    const { values } = this.state;
    const validationResult = validateElements(elements, values, this.elementFormRefs);

    const validateStrategy = createValidatorStrategy(polyglot);

    validatePropertyBeforeSaved(
      validationResult,
      elements,
      values,
      onValidatePropertyBeforeSaved,
      validateStrategy
    );
    const { disabled, errors } = validationResult;
    if (disabled) {
      this.processErrors(errors);

      if (validateStrategy.hasErrors()) {
        PubSub.publish(
          { message: validateStrategy.getErrors(), kind: NotificationKind.Error },
          SUBSCRIPTION.Notification
        );
      }
      return;
    }
    const updatedItem = this.processOvverideUpdatedItem();
    validateUpdatedItemBeforeSaved(
      validationResult,
      updatedItem,
      onValidateUpdatedItemBeforeSaved,
      validateStrategy
    );
    if (validationResult.disabled && validateStrategy.hasErrors()) {
      PubSub.publish(
        { message: validateStrategy.getErrors(), kind: NotificationKind.Error },
        SUBSCRIPTION.Notification
      );
      return;
    }
    if (callback) {
      callback(updatedItem);
    }
  };

  handleSave = () => this.proceedValidateItem(this.doAddAndSave);

  handleReset = () => this.resetForm();

  doReset = () => this.props.disableReset || true;

  handleClickToolbarButton = (proceedItem, callback) => this.proceedValidateItem(callback);

  proceedToolbarButton = () => {
    const { formToolbarButton } = this.props;
    let proceedList = [];
    if (formToolbarButton) {
      proceedList = [...formToolbarButton];
      proceedList.forEach(proceedItem => {
        const originalOnClick = proceedItem.onClick;
        if (proceedItem.onClick) {
          proceedItem.onClick = () => this.handleClickToolbarButton(proceedItem, originalOnClick);
        }
      });
    }
    return proceedList;
  };

  doSave() {
    const { disableSave, onSave, onUpdate, modeForm } = this.props;
    if (disableSave) {
      return false;
    }

    if (isUpdatedForm(modeForm) && onUpdate) {
      return true;
    }

    if (onSave) {
      return true;
    }

    return false;
  }

  render() {
    const { elements, classes, onCellChange } = this.props;
    const { values } = this.state;
    const supportSave = this.doSave();
    const supportReset = this.doReset();
    return (
      <BasicFormLayout
        classes={classes}
        formToolbarButton={this.proceedToolbarButton()}
        elements={elements}
        elementsValue={values}
        doSave={supportSave}
        onSave={this.handleSave}
        doReset={supportReset}
        onReset={this.handleReset}
        onInputChange={this.onInputChange}
        onCellChange={onCellChange}
        onKeyPress={this.onKeyPress}
        forwardRef={this.addElementFormRef}
      />
    );
  }
}

export default withPolyglot(withBasicFormStyles(BasicFormProperties));
