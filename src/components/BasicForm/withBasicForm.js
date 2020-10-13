import React, { useEffect } from 'react';
import useBasicFormConfig from '../../hooks/useBasicFormConfig';
import withPolyglot from '../../utils/withPolyglot';
import { defaultFunc } from '../../utils/props';
import BasicFormProvider from './BasicFormProvider';
import BasicFormContext from '../../utils/BasicFormContext';

const initialFormWidgetFunctions = {
  getValues: defaultFunc,
  validateAndGetUpdateItem: defaultFunc,
};

const initialFieldFunctions = {
  setFieldValue: defaultFunc,
  getFieldValue: defaultFunc,
  setFieldComponentData: defaultFunc,
  getFieldComponent: defaultFunc,
};

const withBasicForm = formConfig => ComposedComponent => {
  const BasicFormComponent = ({ polyglot, ...restProps }) => {
    const { formConfig: basicFormConfig, setFormView } = useBasicFormConfig({
      viewName: ComposedComponent.name,
      formConfig,
      polyglot,
    });

    const basicFormContext = new BasicFormContext({ formConfig: basicFormConfig });

    useEffect(() => {
      const formView = basicFormContext.getFormView();
      if (formView?.postRender) {
        formView.postRender();
      }
    });

    const getField = propName => {
      const formWidget = basicFormContext.getFormWidget();
      const formElement = (formWidget && formWidget.getFormElement(propName)) || {};
      return {
        ...initialFieldFunctions,
        ...formElement,
      };
    };

    const setFieldValue = (propName, value) => {
      getField(propName).setFieldValue(value);
    };

    const getFieldValue = propName => getField(propName).getFieldValue();

    const setFieldComponentData = (propName, data) => {
      getField(propName).setFieldComponentData(data);
    };

    const getFieldComponent = propName => getField(propName).getFieldComponent();

    const composedComponentProps = {
      setFieldValue,
      getFieldValue,
      setFieldComponentData,
      getFieldComponent,
      ...{
        ...initialFormWidgetFunctions,
        ...basicFormContext.getFormWidget(),
      },
    };

    const setViewInstance = ref => {
      basicFormContext.setFormView(ref);
      setFormView(ref);
    };

    return (
      <BasicFormProvider basicFormContext={basicFormContext}>
        <ComposedComponent
          basicFormConfig={basicFormConfig}
          polyglot={polyglot}
          {...restProps}
          {...composedComponentProps}
          ref={setViewInstance}
        />
      </BasicFormProvider>
    );
  };
  return withPolyglot(BasicFormComponent);
};

export default withBasicForm;
