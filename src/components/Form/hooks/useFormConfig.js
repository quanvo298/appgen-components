import { mergeFormConfig } from '../../../helper/FormModuleHelper';
import { usePolyglot } from '../../../utils';

const useFormConfig = ({
  componentName,
  formName: propFormName,
  formConfig: propFormConfig = {},
}) => {
  const polyglot = usePolyglot();

  const createFormConfig = () => {
    const merged = mergeFormConfig({
      componentName,
      formConfig: propFormConfig,
      polyglot,
    });
    const { name } = merged;
    const formName = propFormName || name || componentName;
    merged.name = formName;

    return merged;
  };

  const formConfig = createFormConfig();
  const { name: formName } = formConfig;

  return {
    formName,
    formConfig,
    componentName,
  };
};

export default useFormConfig;
