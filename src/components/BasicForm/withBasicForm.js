import React, { Component } from 'react';
import {
  handlePropertyChanged,
  handleCellChanged,
  handleOvverideUpdatedItemSaved,
  handleOvverideUpdatedItemModified,
  handleValidatePropertyBeforeSaved,
  handleValidateUpdatedItemBeforeSaved,
  handleAfterSaved,
} from 'helper/BasicFormHelper';
import withPolyglot from 'utils/withPolyglot';

const withBasicForm = formConfig => ComposedComponent => {
  class BasicFormComponent extends Component {
    constructor(props) {
      super(props);
      this.setComposedComponentInstance = this.setComposedComponentInstance.bind(this);
    }

    setComposedComponentInstance = ref => {
      this.composedComponentInstance = ref;
    };

    createFormConfig = () => {
      const { polyglot } = this.props;
      const formConfigWrapper = formConfig(polyglot);

      formConfigWrapper.onPropertyChange = (name, value, updatedItem) => {
        handlePropertyChanged(this.composedComponentInstance, name, value, updatedItem);
      };

      formConfigWrapper.onCellChange = ({
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

      formConfigWrapper.onOvverideUpdatedItemSaved = updatedItem =>
        handleOvverideUpdatedItemSaved(this.composedComponentInstance, updatedItem);

      formConfigWrapper.onOvverideUpdatedItemModified = updatedItem =>
        handleOvverideUpdatedItemModified(this.composedComponentInstance, updatedItem);

      formConfigWrapper.onValidatePropertyBeforeSaved = (
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

      formConfigWrapper.onValidateUpdatedItemBeforeSaved = (validateStrategy, updatedItem) =>
        handleValidateUpdatedItemBeforeSaved(
          this.composedComponentInstance,
          validateStrategy,
          updatedItem
        );

      formConfigWrapper.onAfterSaved = updatedItem => {
        handleAfterSaved(this.composedComponentInstance, updatedItem);
      };

      return formConfigWrapper;
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
