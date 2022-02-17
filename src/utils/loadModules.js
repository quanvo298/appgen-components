import { cloneObjectDeep } from './ObjectUtils';

const formModules = {};
const configModule = {
  editors: null,
  types: null,
  themes: null,
};

export const loadFormModules = requireContext => {
  requireContext.keys().forEach(key => {
    formModules[key] = requireContext(key);
  });
};

export const loadConfigModule = config => {
  const { editors, types, themes } = config;
  configModule.editors = editors;
  configModule.types = types;
  configModule.themes = themes;
};

const getFormModules = () => cloneObjectDeep(formModules);
const getConfigModule = () => cloneObjectDeep(configModule);

export { getFormModules, getConfigModule };
