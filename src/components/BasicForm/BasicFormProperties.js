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
import { getEntityId } from '../../helper/ModelHelper';

class BasicFormProperties extends Component {
  constructor(props) {
    super(props);
    this.formElementsRef = {};
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

  renderFormElement = beforeChanges => {
    const { values: updatedItem } = this.state;
    Object.keys(updatedItem).forEach(elementName => {
      if (updatedItem[elementName] !== beforeChanges[elementName]) {
        const formElementRef = this.formElementsRef[elementName];
        formElementRef.setValue(updatedItem[elementName]);
      }
    });
  };

  onPropertyChange = (name, value) => {
    const { onPropertyChange } = this.props;
    const { values } = this.state;
    if (onPropertyChange) {
      const beforeChanges = { ...values };
      onPropertyChange(name, value, values);
      this.renderFormElement(beforeChanges);
    }
  };

  processAfterPropertyChange = (name, value) => {
    const { onAfterPropertiesChanged } = this.props;
    const { values: updatedItem } = this.state;
    if (onAfterPropertiesChanged) {
      const beforeChanges = { ...updatedItem };
      onAfterPropertiesChanged({ name, value, updatedItem });
      this.renderFormElement(beforeChanges);
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

  processUpdatedItemBeforeSaved = updatedItem => {
    const { onUpdatedItemBeforeSaved } = this.props;
    if (onUpdatedItemBeforeSaved) {
      return onUpdatedItemBeforeSaved(updatedItem);
    }
    return updatedItem;
  };

  processUpdatedItemBeforeModified = updatedItem => {
    const { onUpdatedItemBeforeModified } = this.props;
    if (onUpdatedItemBeforeModified) {
      return onUpdatedItemBeforeModified(updatedItem);
    }
    return updatedItem;
  };

  processAfterSaved = updatedItem => {
    const { onAfterSaved } = this.props;
    if (onAfterSaved) {
      onAfterSaved(updatedItem);
    }
  };

  processUpdatedItem = () => {
    const { modeForm, selectedItem } = this.props;
    const { values } = this.state;
    if (isUpdatedForm(modeForm)) {
      const updatedItem = { ...selectedItem, ...values };
      return this.processUpdatedItemBeforeModified(updatedItem);
    }
    if (isNewForm(modeForm)) {
      return this.processUpdatedItemBeforeSaved(values);
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
        const formElementRef = this.formElementsRef[elementName];
        formElementRef.setError(true);
      }
    });
  };

  addFormElementRef = formElementRef => {
    if (formElementRef) {
      const { props } = formElementRef;

      if (props) {
        const { name } = props;
        this.formElementsRef[name] = formElementRef;
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
    const validationResult = validateElements(elements, values, this.formElementsRef);

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
    const updatedItem = this.processUpdatedItem();
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

    const { selectedItem } = this.state;
    if (disableSave) {
      return false;
    }

    if (isUpdatedForm(modeForm)) {
      const id = getEntityId(selectedItem);
      return onUpdate && id !== -1;
    }

    if (onSave) {
      return true;
    }

    return false;
  }

  render() {
    const { elements, classes, onCellChange, FormComponentLayout } = this.props;
    const { values } = this.state;
    const supportSave = this.doSave();
    const supportReset = this.doReset();
    return (
      <BasicFormLayout
        classes={classes}
        FormComponentLayout={FormComponentLayout}
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
        forwardRef={this.addFormElementRef}
      />
    );
  }
}

export default withPolyglot(withBasicFormStyles(BasicFormProperties));
