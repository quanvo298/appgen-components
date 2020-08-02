import { formModules } from '../utils/loadModules';
import { convertToMapByName } from '../utils/CollectionUtils';

export const Prefix = 'override';

export const createFormModuleConfigName = componentName =>
  `./${componentName}/${componentName}.config.${Prefix}.js`;

export const getFormModuleConfig = componentName =>
  formModules[createFormModuleConfigName(componentName)];

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

export const mergeFormConfig = (composedComponentInstance, formConfig, polyglot) => {
  const config = formConfig(polyglot);
  if (composedComponentInstance) {
    const { displayName, name } = composedComponentInstance.constructor;
    const componentName = displayName || name;
    const formModule = getFormModuleConfig(componentName);
    if (formModule && formModule.formConfig) {
      const additionnalFormConfig = formModule.formConfig({ config, polyglot });
      return processToMergeFormConfig(config, additionnalFormConfig);
    }
  }
  return config;
};
