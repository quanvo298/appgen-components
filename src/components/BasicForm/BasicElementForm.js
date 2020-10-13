import React, { useState } from 'react';
import useGetSetRef from '../../hooks/useGetSetRef';
import useFieldDefinition from '../../hooks/useFieldDefinition';
import ElementFormEditor from '../ElementFormEditor/ElementFormEditor';
import { BaiscFormPropertyComponentType } from '../../utils/constant';
import { FUNCTION_VALIDATE } from '../../helper/BasicFormHelper';
import { containString } from '../../utils/StringUtils';
import { isObject, assignToRef } from '../../utils/ObjectUtils';
import { isObjectPropertyType } from '../../utils/FormatUtils';

const IGNORE_COMPONENT_TYPE = [BaiscFormPropertyComponentType.Grid];

const BasicElementForm = React.forwardRef((props, ref) => {
  const {
    name: propName,
    value: propValue = undefined,
    onInputChange,
    onCellChange,
    optProps = {},
    variant,
  } = props;
  const { get: getEditorRef, ref: editorRef } = useGetSetRef(null);
  const [objectValue, setObjectValue] = useState({ value: propValue });
  const [error, setError] = useState(false);
  const {
    getFieldComponent,
    setComponentData,
    getFieldDefinition,
    setFieldDefinition,
  } = useFieldDefinition(props);

  const processElementValue = elementValue => {
    const { type, component = { data: [] } } = getFieldDefinition();
    if (elementValue && !isObject(elementValue) && isObjectPropertyType(type)) {
      return component.data.find(comp => comp.value === elementValue);
    }
    return elementValue;
  };

  const doRender = () => {
    const { component } = getFieldDefinition();
    return component ? !IGNORE_COMPONENT_TYPE.includes(component.type) : true;
  };

  const onChange = (propElementValue, event) => {
    const { regExp } = optProps;
    const elementValue = processElementValue(propElementValue);
    if (event && event.preventDefault) event.preventDefault();

    if (regExp && elementValue && !containString(elementValue, regExp)) {
      return;
    }

    if (onInputChange) {
      onInputChange(propName, elementValue)(event);
    }
    if (doRender()) {
      setObjectValue({ value: elementValue });
    }
  };

  const handleInputChange = (_, valueKey = 'value') => event => {
    const { target } = event;
    onChange(target[valueKey], event);
  };

  const getFieldValue = () => objectValue.value;

  const setFieldValue = fieldValue => {
    const elementValue = processElementValue(fieldValue);
    if (onInputChange) onInputChange(propName, elementValue)();
    setObjectValue({ value: elementValue });
  };

  const setFieldError = fieldError => {
    setError(fieldError);
  };

  const setFieldComponentData = data => {
    setComponentData(data);
  };

  const validate = () => {
    const editor = getEditorRef() || {};
    const elementFormValidate = editor[FUNCTION_VALIDATE];
    return elementFormValidate ? elementFormValidate() : true;
  };

  const changeDefinition = definition => {
    setFieldDefinition(definition);
  };

  assignToRef(ref, {
    name: propName,
    getFieldValue,
    setFieldValue,
    setFieldError,
    setFieldComponentData,
    getFieldComponent,
    changeDefinition,
    validate,
  });

  return (
    <ElementFormEditor
      variant={variant}
      {...getFieldDefinition()}
      objectValue={{ value: getFieldValue() }}
      value={getFieldValue()}
      error={error}
      ref={editorRef}
      onInputChange={handleInputChange}
      onCellChange={onCellChange}
    />
  );
});

export default BasicElementForm;
