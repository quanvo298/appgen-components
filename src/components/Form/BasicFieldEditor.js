import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import TextInput from '../TextInput/TextInput';
import NumberField from '../NumberField/NumberField';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import { FieldType } from '../../utils/constant';

const FieldEditorByType = {
  [FieldType.Boolean]: Checkbox,
  [FieldType.Date]: DateTimeInput,
  [FieldType.DateTime]: DateTimeInput,
  [FieldType.Number]: NumberField,
  [FieldType.Text]: TextInput,
  [FieldType.LongText]: TextInput,
};

export default props => {
  const handleChange = event => {
    if (props.onChange) {
      event.preventDefault();
      event.stopPropagation();
      const { target } = event;
      props.onChange({ value: target.value, event });
    }
  };
  const propType = props.type || FieldType.Text;
  const BasicFieldEditor = FieldEditorByType[propType];
  return <BasicFieldEditor {...props} onChange={handleChange} />;
};
