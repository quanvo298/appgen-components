import { getFormModules } from '../utils/loadModules';

export const Prefix = 'form';

export const createFormModuleName = componentName =>
  `./${componentName}/${componentName}.${Prefix}.js`;

export const getFormModule = componentName => {
  return getFormModules()[createFormModuleName(componentName)];
};

export const processToMergeFormConfig = (originalFormConfig, additionalFormConfig) => {
  if (additionalFormConfig) {
    const { fields: overrideFields } = additionalFormConfig;
    const { fields: originalFields } = originalFormConfig;
    const wrapper = {
      ...originalFormConfig,
      ...additionalFormConfig,
      fields: {
        ...originalFields,
        ...overrideFields,
      },
    };
    return wrapper;
  }
  return originalFormConfig;
};

export const mergeFormConfig = ({ componentName, formConfig, polyglot }) => {
  const config = formConfig(polyglot);
  if (componentName) {
    const formModule = getFormModule(componentName);
    const { formConfig: overrideFormConfig } = formModule || {};
    if (overrideFormConfig) {
      const additionalFormConfig = overrideFormConfig({
        originalFormConfig: config,
        polyglot,
      });
      return processToMergeFormConfig(config, additionalFormConfig);
    }
  }
  return config;
};

export const getCustomFormIntegration = ({ formView, formViewProps }) => {
  if (formView) {
    const formModule = getFormModule(formView);
    const { integration } = formModule || {};
    if (integration) {
      return integration(formViewProps);
    }
  }
  return null;
};
