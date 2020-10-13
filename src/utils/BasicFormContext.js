class BasicFormContext {
  constructor(props) {
    const { formConfig } = props;
    this.formConfig = formConfig;
    this.formWidget = null;
    this.formView = null;
  }

  setFormWidget(basicFormWidget) {
    this.formWidget = basicFormWidget;
  }

  getFormWidget() {
    return this.formWidget;
  }

  setFormView(basicFormView) {
    this.formView = basicFormView;
  }

  getFormView() {
    return this.formView;
  }
}

export default BasicFormContext;
