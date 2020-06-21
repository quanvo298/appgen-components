import React, { Component } from 'react';
import ElementFormEditor from '../ElementFormEditor/ElementFormEditor';
import { BaiscFormPropertyComponentType } from '../../utils/constant';
import { FUNCTION_VALIDATE } from '../../helper/BasicFormHelper';
import { isObject, containString } from '../../utils/StringUtils';
import { isObjectPropertyType } from '../../utils/FormatUtils';

const IGNORE_COMPONENT_TYPE = [BaiscFormPropertyComponentType.Grid];

class BasicElementForm extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      overridedDefinition: {},
      value: undefined,
      error: false,
      fromSetState: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { value, error } = props;
    const { value: valueFromState, error: errorFromState, fromSetState } = state;
    const shouldBeUpdated = fromSetState || value !== valueFromState || error !== errorFromState;

    if (shouldBeUpdated) {
      return fromSetState
        ? {
            value: valueFromState,
            error: errorFromState,
            fromSetState: false,
          }
        : { value, error, fromSetState: false };
    }
    return null;
  }

  getEditorRef = () => this.editorRef.current;

  validate = () => {
    const elemenentFormValidate = this.getEditorRef() && this.getEditorRef()[FUNCTION_VALIDATE];
    if (elemenentFormValidate) {
      return elemenentFormValidate();
    }
    return false;
  };

  doRender = () => {
    const { component } = this.props;
    if (component) {
      return !IGNORE_COMPONENT_TYPE.includes(component.type);
    }
    return true;
  };

  setError = error => {
    if (this.doRender()) {
      this.setState({ error, fromSetState: true });
    }
  };

  changeDefinition = definition => {
    this.setState({ overridedDefinition: definition });
  };

  setValue = value => {
    const { name } = this.props;
    this.onChange(name, value);
  };

  getValue = () => this.state.value;

  doSupportObjectValue = elementValue => {
    const { type, component } = this.props;
    return (
      elementValue &&
      !isObject(elementValue) &&
      isObjectPropertyType(type) &&
      component &&
      component.data
    );
  };

  processElementValue = elementValue => {
    if (this.doSupportObjectValue(elementValue)) {
      const { component } = this.props;
      return component.data.find(comp => comp.value === elementValue);
    }
    return elementValue;
  };

  hanldeInputChange = (name, valueKey) => event => {
    const { target } = event;
    const elementValue = valueKey ? target[valueKey] : target.value;
    this.onChange(name, elementValue, event);
  };

  onChange = (name, elementValue, event) => {
    const { onInputChange, optProps = {} } = this.props;
    const { regExp } = optProps;
    if (regExp && elementValue && !containString(elementValue, regExp)) {
      if (event) {
        event.preventDefault();
      }
      return;
    }

    if (onInputChange) {
      onInputChange(name, this.processElementValue(elementValue))(event);
    }

    if (this.doRender()) {
      this.setState({ value: elementValue, fromSetState: true });
    }
  };

  render() {
    const { optProps, ...restProps } = this.props;
    const { value, error, overridedDefinition } = this.state;
    return (
      <ElementFormEditor
        {...restProps}
        {...overridedDefinition}
        value={value}
        error={error}
        ref={this.editorRef}
        onInputChange={this.hanldeInputChange}
      />
    );
  }
}

export default BasicElementForm;
