import {
  handlePropertyChanged,
  handleCellChanged,
  handleGetCellDefinition,
  handleBeforeSaved,
  handleBeforeModified,
  handleValidatePropertyBeforeSaved,
  handleValidateUpdatedItemBeforeSaved,
  handleAfterSaved,
} from '../helper/BasicFormHelper';
import { mergeFormConfig } from '../helper/FormModuleHelper';
import useGetSetRef from './useGetSetRef';

const useBasicFormConfig = ({ viewName, formConfig, polyglot }) => {
  const { get: getFormView, set: setFormView } = useGetSetRef(null);

  const onPropertyChange = (name, value, updatedItem) => event => {
    handlePropertyChanged(getFormView(), name, value, updatedItem, event);
  };

  const onCellChange = ({ propertyName, cellName, cellValue, rowIndexed, gridData, event }) => {
    handleCellChanged(
      getFormView(),
      propertyName,
      cellName,
      cellValue,
      rowIndexed,
      gridData,
      event
    );
  };

  const onGetCellDefinition = ({ propertyName, cellName, rowIndexed }) => {
    return handleGetCellDefinition(getFormView(), propertyName, cellName, rowIndexed);
  };

  const onBeforeSaved = updatedItem => handleBeforeSaved(getFormView(), updatedItem);

  const onBeforeModified = updatedItem => handleBeforeModified(getFormView(), updatedItem);

  const onValidatePropertyBeforeSaved = (validateStrategy, element, value, updatedItem) =>
    handleValidatePropertyBeforeSaved(getFormView(), validateStrategy, element, value, updatedItem);

  const onValidateUpdatedItemBeforeSaved = (validateStrategy, updatedItem) =>
    handleValidateUpdatedItemBeforeSaved(getFormView(), validateStrategy, updatedItem);

  const onAfterSaved = updatedItem => {
    handleAfterSaved(getFormView(), updatedItem);
  };

  const createFormConfig = () => {
    const basicFormConfig = mergeFormConfig({ viewName, formConfig, polyglot });
    return {
      ...basicFormConfig,
      onCellChange,
      onGetCellDefinition,
      onPropertyChange,
      onBeforeSaved,
      onBeforeModified,
      onValidatePropertyBeforeSaved,
      onValidateUpdatedItemBeforeSaved,
      onAfterSaved,
    };
  };

  return {
    getFormView,
    setFormView,
    formConfig: createFormConfig(),
  };
};

export default useBasicFormConfig;
