import React, { useRef } from 'react';
import {
  handlePropertyChanged,
  handleCellChanged,
  handleGetCellDefinition,
  handleBeforeSaved,
  handleBeforeModified,
  handleValidatePropertyBeforeSaved,
  handleValidateUpdatedItemBeforeSaved,
  handleAfterSaved,
} from '../../helper/BasicFormHelper';
import withPolyglot from '../../utils/withPolyglot';

const withBasicForm = formConfig => ComposedComponent => {
  const BasicFormComponent = ({ polyglot, ...restProps }) => {
    const basicFormRef = useRef(null);
    const composedComponentInstance = useRef(null);

    const getBasicForm = () => basicFormRef.current;

    const setComposedComponentInstance = ref => {
      composedComponentInstance.current = ref;
    };

    const getComposedComponentInstance = () => composedComponentInstance.current;

    const onPropertyChange = (name, value, updatedItem) => event => {
      handlePropertyChanged(getComposedComponentInstance(), name, value, updatedItem, event);
    };

    const onCellChange = ({ propertyName, cellName, cellValue, rowIndexed, gridData, event }) => {
      handleCellChanged(
        getComposedComponentInstance(),
        propertyName,
        cellName,
        cellValue,
        rowIndexed,
        gridData,
        event
      );
    };

    const onGetCellDefinition = ({ propertyName, cellName, rowIndexed }) => {
      return handleGetCellDefinition(
        getComposedComponentInstance(),
        propertyName,
        cellName,
        rowIndexed
      );
    };

    const onBeforeSaved = updatedItem =>
      handleBeforeSaved(getComposedComponentInstance(), updatedItem);

    const onBeforeModified = updatedItem =>
      handleBeforeModified(getComposedComponentInstance(), updatedItem);

    const onValidatePropertyBeforeSaved = (validateStrategy, element, value, updatedItem) =>
      handleValidatePropertyBeforeSaved(
        getComposedComponentInstance(),
        validateStrategy,
        element,
        value,
        updatedItem
      );

    const onValidateUpdatedItemBeforeSaved = (validateStrategy, updatedItem) =>
      handleValidateUpdatedItemBeforeSaved(
        getComposedComponentInstance(),
        validateStrategy,
        updatedItem
      );

    const onAfterSaved = updatedItem => {
      handleAfterSaved(getComposedComponentInstance(), updatedItem);
    };

    const createFormConfig = () => ({
      ...formConfig(polyglot),
      onCellChange,
      onGetCellDefinition,
      onPropertyChange,
      onBeforeSaved,
      onBeforeModified,
      onValidatePropertyBeforeSaved,
      onValidateUpdatedItemBeforeSaved,
      onAfterSaved,
      ref: basicFormRef,
    });

    const getFormElement = propName => getBasicForm().getFormElement(propName);

    const setFieldValue = (propName, value) => {
      getFormElement(propName).setValue(value);
    };

    const getFieldValue = propName =>
      getFormElement(propName) && getFormElement(propName).getValue();

    const composedComponentProps = {
      setFieldValue,
      getFieldValue,
      ...getBasicForm(),
    };

    return (
      <ComposedComponent
        basicFormConfig={createFormConfig()}
        polyglot={polyglot}
        {...restProps}
        {...composedComponentProps}
        ref={setComposedComponentInstance}
      />
    );
  };
  return withPolyglot(BasicFormComponent);
};

export default withBasicForm;
