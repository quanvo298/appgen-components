import React from 'react';
import Checkbox from '../Checkbox/Checkbox';
import TextInput from '../TextInput/TextInput';
import NumberField from '../NumberField/NumberField';
import DateTimeInput from '../DateTimeInput/DateTimeInput';
import { FieldType } from '../../utils/constant';
import { formatFieldValueBaseOnType } from '../../utils/FormatUtils';

const FieldEditorByType = {
  [FieldType.Boolean]: Checkbox,
  [FieldType.Date]: DateTimeInput,
  [FieldType.DateTime]: DateTimeInput,
  [FieldType.Number]: NumberField,
  [FieldType.Text]: TextInput,
  [FieldType.LongText]: TextInput,
};

export default props => {
  const propType = props.type || FieldType.Text;
  const BasicFieldEditor = FieldEditorByType[propType.toLowerCase()] || TextInput;

  const handleChange = event => {
    if (props.onChange) {
      const { value } = event.target;
      props.onChange({ value: formatFieldValueBaseOnType({ value, type: propType }), event });
    }
  };

  return <BasicFieldEditor {...props} onChange={handleChange} />;
};
