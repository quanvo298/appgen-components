import { formModules } from '../utils/loadModules';
import { convertToMapByName } from '../utils/CollectionUtils';

export const Prefix = 'form.override';

export const createFormModuleName = componentName =>
  `./${componentName}/${componentName}.${Prefix}.js`;

export const getFormModule = componentName => formModules[createFormModuleName(componentName)];

export const processToMergeFormConfigElements = (
  originalElements = [],
  additionalElements = []
) => {
  if (additionalElements.length) {
    const additionalElementNames = convertToMapByName(additionalElements);
    return [
      ...originalElements.filter(({ name }) => !additionalElementNames[name]),
      ...additionalElements,
    ];
  }
  return originalElements;
};

export const processToMergeFormConfig = (originalFormConfig, additionalFormConfig) => {
  if (additionalFormConfig) {
    const { elements: additionalElements } = additionalFormConfig;
    const { elements: originalElements } = originalFormConfig;
    const wrapper = {
      ...originalFormConfig,
      ...additionalFormConfig,
      elements: processToMergeFormConfigElements(originalElements, additionalElements),
    };
    return wrapper;
  }
  return originalFormConfig;
};

export const mergeFormConfig = ({ componentName, formConfig, polyglot }) => {
  const config = formConfig(polyglot);
  if (componentName) {
    const formModule = getFormModule(componentName);
    if (formModule && formModule.formConfig) {
      const additionalFormConfig = formModule.formConfig({
        originalFormConfig: config,
        polyglot,
      });
      return processToMergeFormConfig(config, additionalFormConfig);
    }
  }
  return config;
};

export const mergeFormIntegration = ({ viewName, formView }) => {
  if (formView) {
    const componentName = viewName;
    const formModule = getFormModule(componentName);
    const { integration } = formModule || {};
    if (integration) {
      const formIntegration = integration(formView);
      Object.assign(formView, formIntegration);
    }
  }
};
