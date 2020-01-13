import React, { Component } from 'react';
import FormLabel from '@material-ui/core/InputLabel';
import Row from '../Container/Row';
import Wrapper from '../Container/Wrapper';
import ElementFormEditor from '../ElementFormEditor/ElementFormEditor';
import { BaiscFormPropertyComponentType } from '../../utils/constant';
import { FUNCTION_VALIDATE } from '../../helper/BasicFormHelper';
import { isObject } from '../../utils/StringUtils';
import { isObjectPropertyType } from '../../utils/FormatUtils';

const LABEL_WIDTH = 200;

const IGNORE_COMPONENT_TYPE = [BaiscFormPropertyComponentType.Grid];

const ElementFormControl = React.forwardRef((props, ref) => (
  <Row flexWrap="nowrap" m={2}>
    <Wrapper position="relative" width={`${LABEL_WIDTH}px`} pt={16}>
      <FormLabel position="relative" shrink={false}>
        {props.label} {props.required && '*'}:
      </FormLabel>
    </Wrapper>
    <Wrapper width={1} mx="0">
      <ElementFormEditor {...props} forwardedRef={ref} />
    </Wrapper>
  </Row>
));

const ElementForm = React.forwardRef((props, ref) => (
  <ElementFormEditor forwardRef={ref} {...props} />
));

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

  validate = () => {
    const elemenentFormValidate =
      this.editorRef.current && this.editorRef.current[FUNCTION_VALIDATE];
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
    this.setState({ value, fromSetState: true });
  };

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
    const { onInputChange } = this.props;
    const { target } = event;
    const elementValue = valueKey ? target[valueKey] : target.value;
    if (onInputChange) {
      onInputChange(name, this.processElementValue(elementValue))(event);
    }
    if (this.doRender()) {
      this.setState({ value: elementValue, fromSetState: true });
    }
  };

  render() {
    const { supportFormControl } = this.props;
    const { value, error, overridedDefinition } = this.state;
    return supportFormControl ? (
      <ElementFormControl
        {...this.props}
        {...overridedDefinition}
        value={value}
        error={error}
        onInputChange={this.hanldeInputChange}
        ref={this.editorRef}
      />
    ) : (
      <ElementForm
        {...this.props}
        {...overridedDefinition}
        value={value}
        error={error}
        ref={this.editorRef}
        onInputChange={this.hanldeInputChange}
      />
    );
  }
}

BasicElementForm.defaultProps = {
  supportFormControl: true,
};

export default BasicElementForm;
