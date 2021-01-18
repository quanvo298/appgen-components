import { mergeFormConfig } from '../../../helper/FormModuleHelper';

const useFormConfig = ({ componentName, formName, formConfig: propFormConfig = {}, polyglot }) => {
  const createFormConfig = () => {
    const merged = mergeFormConfig({
      componentName,
      formConfig: propFormConfig,
      polyglot,
    });

    return merged;
  };

  const formConfig = createFormConfig();
  const { contentList: contentListConfig, name } = formConfig;

  return {
    formName: name || formName || componentName,
    formConfig,
    contentListConfig,
  };
};

export default useFormConfig;
