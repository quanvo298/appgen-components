import React, { Component } from 'react';
import {
  handlePropertyChanged,
  handleCellChanged,
  handleBeforeSaved,
  handleBeforeModified,
  handleValidatePropertyBeforeSaved,
  handleValidateUpdatedItemBeforeSaved,
  handleAfterSaved,
} from '../../helper/BasicFormHelper';
import withPolyglot from '../../utils/withPolyglot';

const withBasicForm = formConfig => ComposedComponent => {
  class BasicFormComponent extends Component {
    constructor(props) {
      super(props);
      this.setComposedComponentInstance = this.setComposedComponentInstance.bind(this);
      this.basicFormRef = React.createRef(null);
    }

    getBasicForm = () => this.basicFormRef.current;

    setComposedComponentInstance = ref => {
      this.composedComponentInstance = ref;
    };

    createFormConfig = () => {
      const { polyglot } = this.props;
      const basicFormConfig = formConfig(polyglot);

      basicFormConfig.onPropertyChange = (name, value, updatedItem) => {
        handlePropertyChanged(this.composedComponentInstance, name, value, updatedItem);
      };

      basicFormConfig.onCellChange = ({
        propertyName,
        cellName,
        cellValue,
        rowIndexed,
        gridData,
        event,
      }) => {
        handleCellChanged(
          this.composedComponentInstance,
          propertyName,
          cellName,
          cellValue,
          rowIndexed,
          gridData,
          event
        );
      };

      basicFormConfig.onBeforeSaved = updatedItem =>
        handleBeforeSaved(this.composedComponentInstance, updatedItem);

      basicFormConfig.onBeforeModified = updatedItem =>
        handleBeforeModified(this.composedComponentInstance, updatedItem);

      basicFormConfig.onValidatePropertyBeforeSaved = (
        validateStrategy,
        element,
        value,
        updatedItem
      ) =>
        handleValidatePropertyBeforeSaved(
          this.composedComponentInstance,
          validateStrategy,
          element,
          value,
          updatedItem
        );

      basicFormConfig.onValidateUpdatedItemBeforeSaved = (validateStrategy, updatedItem) =>
        handleValidateUpdatedItemBeforeSaved(
          this.composedComponentInstance,
          validateStrategy,
          updatedItem
        );

      basicFormConfig.onAfterSaved = updatedItem => {
        handleAfterSaved(this.composedComponentInstance, updatedItem);
      };

      basicFormConfig.ref = this.basicFormRef;
      return basicFormConfig;
    };

    getFormElement = propName => this.getBasicForm().getFormElement(propName);

    setFieldValue = (propName, value) => {
      this.getFormElement(propName).setValue(value);
    };

    getFieldValue = propName => this.getFormElement(propName).getValue();

    getEditorRef = propName => this.getFormElement(propName).getEditorRef();

    render() {
      const basicFormConfig = this.createFormConfig();
      return (
        <ComposedComponent
          basicFormConfig={basicFormConfig}
          {...this.props}
          setFieldValue={this.setFieldValue}
          getFieldValue={this.getFieldValue}
          getEditorRef={this.getEditorRef}
          ref={this.setComposedComponentInstance}
        />
      );
    }
  }

  return withPolyglot(BasicFormComponent);
};

export default withBasicForm;
