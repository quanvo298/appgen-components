import React from 'react';
import withPolyglot from '../../../hocs/withPolyglot';
import FormProvider, { useForm } from './FormProvider';
import useFormConfig from '../hooks/useFormConfig';
import { getCustomFormIntegration } from '../../../helper/FormModuleHelper';

const FormComponent = ({ polyglot, formName, formConfig, ComposedFormView, ...restProps }) => {
  const formInst = useForm(formName);
  const { contentList: contentListConfig } = formConfig;
  const composedFormViewProps = {
    ...restProps,
    form: formInst,
    formName,
    formConfig,
    contentListConfig,
    polyglot,
  };

  const formIntegration = getCustomFormIntegration({
    formView: ComposedFormView.name,
    formViewProps: composedFormViewProps,
  });

  formInst.setCustomFormIntegration(formIntegration);

  return <ComposedFormView {...composedFormViewProps} />;
};

const withForm = propFormConfig => ComposedFormView => {
  const FormProviderComponent = ({ formName: propFormName, ...props }) => {
    const { initialized, addForm } = useForm();

    const { formName, formConfig, componentName: fileViewName } = useFormConfig({
      formName: propFormName,
      componentName: ComposedFormView.name,
      formConfig: propFormConfig,
    });

    if (initialized) {
      addForm(formName, { formConfig, fileViewName });
      return (
        <FormComponent
          formName={formName}
          formConfig={formConfig}
          ComposedFormView={ComposedFormView}
          {...props}
        />
      );
    }
    return (
      <FormProvider formConfig={formConfig} formName={formName} fileViewName={fileViewName}>
        <FormComponent
          formName={formName}
          ComposedFormView={ComposedFormView}
          formConfig={formConfig}
          {...props}
        />
      </FormProvider>
    );
  };

  return withPolyglot(FormProviderComponent);
};

export default withForm;
