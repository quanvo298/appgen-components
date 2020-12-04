import { useState, useEffect } from 'react';

const useFieldDefinition = ({
  disabled: propDisabled,
  length: propLength,
  component: propComponent,
  label: propLabel,
  name: propName,
  required: propRequired,
  type: propType,
  defaultValue: propDefaultValue,
}) => {
  const [component, setComponent] = useState(propComponent);
  const [disabled, setDisabled] = useState(propDisabled);
  const [length, setLength] = useState(propLength);
  const [label, setLabel] = useState(propLabel);
  const [name, setName] = useState(propName);
  const [required, setRequired] = useState(propRequired);
  const [type, setType] = useState(propType);
  const [defaultValue, setDefaultValue] = useState(propDefaultValue);

  useEffect(() => {
    setComponent(propComponent);
  }, [propComponent]);

  useEffect(() => {
    setRequired(propRequired);
    setLabel(propLabel);
    setDisabled(propDisabled);
    setLength(propLength);
    setName(propName);
    setType(propType);
    setDefaultValue(propDefaultValue);
  }, [propRequired, propLabel, propDisabled, propLength, propName, propType, propDefaultValue]);

  const setComponentData = data => {
    if (component) {
      setComponent({ ...component, data });
    }
  };

  const getDefaultValue = () => defaultValue;

  const getFieldDefinition = () => ({
    length,
    component,
    label,
    name,
    required,
    type,
    defaultValue,
    disabled,
  });

  const setFieldDefinition = (definition = {}) => {
    Object.keys(definition).forEach(key => {
      switch (key) {
        case 'length':
          setLength(definition[key]);
          break;
        case 'component':
          setComponent(definition[key]);
          break;
        case 'label':
          setLabel(definition[key]);
          break;
        case 'name':
          setName(definition[key]);
          break;
        case 'required':
          setRequired(definition[key]);
          break;
        case 'type':
          setType(definition[key]);
          break;
        case 'defaultValue':
          setDefaultValue(definition[key]);
          break;
        case 'disabled':
          setDisabled(definition[key]);
          break;
        default:
          break;
      }
    });
  };

  return {
    getFieldComponent: () => component,
    setComponentData,
    getFieldDefinition,
    setFieldDefinition,
    getDefaultValue,
  };
};

export default useFieldDefinition;
