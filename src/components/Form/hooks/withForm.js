import React from 'react';
import withPolyglot from '../../../utils/withPolyglot';
import useFormConfig from './useFormConfig';
import FormProvider, { useFormCtx } from './FormProvider';
import FormContext from './FormContext';

const withForm = propFormConfig => ComposedFormView => {
  const FormComponent = ({ polyglot, ...restProps }) => {
    const { setFormConfig } = useFormCtx();
    const { formConfig, contentListConfig } = useFormConfig({
      componentName: ComposedFormView.name,
      formConfig: propFormConfig,
      polyglot,
    });

    setFormConfig(formConfig);

    return (
      <ComposedFormView
        {...restProps}
        formConfig={formConfig}
        contentListConfig={contentListConfig}
        polyglot={polyglot}
      />
    );
  };

  const FormProviderComponent = props => {
    const formContext = new FormContext({ formConfig: props.formConfig });
    return (
      <FormProvider formContext={formContext}>
        <FormComponent {...props} />
      </FormProvider>
    );
  };

  return withPolyglot(FormProviderComponent);
};

export default withForm;
