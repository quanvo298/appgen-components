import React, { useState } from 'react';
import useGetSetRef from '../../hooks/useGetSetRef';
import useFieldDefinition from '../../hooks/useFieldDefinition';
import ElementFormEditor from '../ElementFormEditor/ElementFormEditor';
import { BaiscFormPropertyComponentType } from '../../utils/constant';
import { FUNCTION_VALIDATE } from '../../helper/BasicFormHelper';
import { containString } from '../../utils/StringUtils';
import { assignToRef } from '../../utils/ObjectUtils';
import { processElementValue, convertToElementValue } from '../../helper/ElementValueHelper';

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

  const {
    getFieldComponent,
    setComponentData,
    getFieldDefinition,
    setFieldDefinition,
    getDefaultValue,
  } = useFieldDefinition(props);

  const convertToObjectValue = elementValue => {
    if (elementValue == null) {
      return { value: null };
    }
    const { type, component = { data: [] } } = getFieldDefinition();
    const convertedValue = convertToElementValue({
      elementValue,
      type,
      component,
    });
    return {
      value: convertedValue,
    };
  };

  const initialValue = propValue || getDefaultValue();
  const { get: getEditorRef, ref: editorRef } = useGetSetRef(null);
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const processFieldValue = elementValue => {
    const { type, component = { data: [] } } = getFieldDefinition();
    return processElementValue({ elementValue, type, component });
  };

  const doRender = () => {
    const { component } = getFieldDefinition();
    return component ? !IGNORE_COMPONENT_TYPE.includes(component.type) : true;
  };

  const processChange = (propElementValue, event, render) => {
    const { regExp } = optProps;
    const elementValue = processFieldValue(propElementValue);

    if (event && event.preventDefault) event.preventDefault();

    if (regExp && elementValue && !containString(elementValue, regExp)) {
      return;
    }

    if (onInputChange) {
      onInputChange(propName, elementValue)(event);
    }
    if (render) {
      setValue(elementValue);
    }
  };

  const handleInputChange = (_, valueKey = 'value') => event => {
    const { target } = event;
    processChange(target[valueKey], event, doRender());
  };

  const getFieldValue = () => value;

  const setFieldValue = fieldValue => {
    processChange(fieldValue, null, true);
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

  const objectValue = convertToObjectValue(getFieldValue());

  return (
    <ElementFormEditor
      variant={variant}
      {...getFieldDefinition()}
      objectValue={objectValue}
      value={objectValue ? objectValue.value : null}
      error={error}
      ref={editorRef}
      onInputChange={handleInputChange}
      onCellChange={onCellChange}
    />
  );
});

export default BasicElementForm;
