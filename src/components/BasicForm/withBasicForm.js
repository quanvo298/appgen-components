import React, { Component } from 'react';
import {
  handlePropertyChanged,
  handleCellChanged,
  handleUpdatedItemBeforeSaved,
  handleUpdatedItemBeforeModified,
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
      this.basicFormRef = React.createRef();
    }

    setComposedComponentInstance = ref => {
      this.composedComponentInstance = ref;
      const { current: basicFormCurrentRef } = this.basicFormRef;
      if (ref && basicFormCurrentRef) {
        ref.getFormElement = propName => basicFormCurrentRef.getFormElement(propName);
      }
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

      basicFormConfig.onUpdatedItemBeforeSaved = updatedItem =>
        handleUpdatedItemBeforeSaved(this.composedComponentInstance, updatedItem);

      basicFormConfig.onUpdatedItemBeforeModified = updatedItem =>
        handleUpdatedItemBeforeModified(this.composedComponentInstance, updatedItem);

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

    render() {
      const basicFormConfig = this.createFormConfig();
      return (
        <ComposedComponent
          basicFormConfig={basicFormConfig}
          {...this.props}
          ref={this.setComposedComponentInstance}
        />
      );
    }
  }

  return withPolyglot(BasicFormComponent);
};

export default withBasicForm;
