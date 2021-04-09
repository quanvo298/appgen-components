import React from 'react';
import withPolyglot from '../../../utils/withPolyglot';
import FormProvider, { useForm } from './FormProvider';
import useFormConfig from '../hooks/useFormConfig';

const withForm = propFormConfig => ComposedFormView => {
  const FormComponent = ({ polyglot, formName, formConfig, ...restProps }) => {
    const formInst = useForm(formName);
    const { contentList: contentListConfig } = formConfig;

    return (
      <ComposedFormView
        {...restProps}
        form={formInst}
        formName={formName}
        formConfig={formConfig}
        contentListConfig={contentListConfig}
        polyglot={polyglot}
      />
    );
  };

  const FormProviderComponent = ({ formName: propFormName, ...props }) => {
    const { initialized, addForm } = useForm();
    const { formName, formConfig } = useFormConfig({
      formName: propFormName,
      componentName: ComposedFormView.name,
      formConfig: propFormConfig,
    });

    if (initialized) {
      addForm(formName, { formConfig });
      return <FormComponent formName={formName} formConfig={formConfig} {...props} />;
    }
    return (
      <FormProvider formConfig={formConfig} formName={formName}>
        <FormComponent formName={formName} formConfig={formConfig} {...props} />
      </FormProvider>
    );
  };

  return withPolyglot(FormProviderComponent);
};

export default withForm;
