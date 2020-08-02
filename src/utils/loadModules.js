const formModules = {};
const configModule = {};

export const loadFormModules = requireContext => {
  requireContext.keys().forEach(key => {
    formModules[key] = requireContext(key);
  });
};

export const loadConfigModule = config => {
  configModule.config = config;
};

export { formModules, configModule };
