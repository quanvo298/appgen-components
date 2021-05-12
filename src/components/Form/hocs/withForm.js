import React from 'react';
import withPolyglot from '../../../hocs/withPolyglot';
import FormProvider, { useForm } from './FormProvider';
import useFormConfig from '../hooks/useFormConfig';

const FormComponent = ({ polyglot, formName, formConfig, ComposedFormView, ...restProps }) => {
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

const withForm = propFormConfig => ComposedFormView => {
  const FormProviderComponent = ({ formName: propFormName, ...props }) => {
    const { initialized, addForm } = useForm();

    const { formName, formConfig } = useFormConfig({
      formName: propFormName,
      componentName: ComposedFormView.name,
      formConfig: propFormConfig,
    });

    if (initialized) {
      addForm(formName, { formConfig });
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
      <FormProvider formConfig={formConfig} formName={formName}>
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
