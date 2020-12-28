import {
  handlePropertyChanged,
  handleCellChanged,
  handleGetCellDefinition,
  handleBeforeSaved,
  handleBeforeModified,
  handleValidatePropertyBeforeSaved,
  handleValidateUpdatedItemBeforeSaved,
  handleAfterSaved,
  handleRenderContentListCellValue,
} from '../helper/BasicFormHelper';
import { mergeFormConfig, mergeFormIntegration } from '../helper/FormModuleHelper';
import useGetSetRef from './useGetSetRef';
import BasicFormContext from '../utils/BasicFormContext';

const useBasicFormConfig = ({ viewName, formConfig, polyglot }) => {
  const { get: getFormView, set: setFormViewRef } = useGetSetRef(null);
  const basicFormContext = new BasicFormContext();

  const setFormView = formView => {
    mergeFormIntegration({ viewName, formView });
    setFormViewRef(formView);
    basicFormContext.setFormView(formView);
  };

  const onPropertyChange = ({ name, value, updatedItem, event }) => {
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

  const renderContentListCellValue = ({ cellName, cellValue, rowIndexed, column, gridData }) => {
    return handleRenderContentListCellValue(
      getFormView(),
      cellName,
      cellValue,
      rowIndexed,
      gridData,
      column
    );
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
      renderContentListCellValue,
    };
  };

  const basicFormConfig = createFormConfig();
  basicFormContext.setFormConfig(basicFormConfig);

  return {
    setFormView,
    formConfig: basicFormConfig,
    basicFormContext,
  };
};

export default useBasicFormConfig;
