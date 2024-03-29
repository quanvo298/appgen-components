import { ModeFormType, UUID } from '../utils/constant';
import { getEntityId } from './ModelHelper';
import { validateField } from './Validator';
import { upperFirstChar } from '../utils';

export const PROPERTIES_SYSTEM = {
  Label: 'label',
  Name: 'name',
};

export const isUpdatedForm = modeForm => modeForm === ModeFormType.UPDATE;

export const FIELD_CHANGED = `fieldChanged`;

export const createFieldEventChanged = name => {
  return `field${upperFirstChar(name)}EventChanged`;
};

export const createFieldChanged = name => {
  return `field${upperFirstChar(name)}Changed`;
};

export const createFieldCellChangedEvent = name => {
  return `field${upperFirstChar(name)}CellChanged`;
};

export const createFieldEventEmitter = (name, eventName) => {
  return `field${upperFirstChar(name)}${upperFirstChar(eventName)}`;
};

export const createFieldGridRowDefIntegration = name => {
  return `reduceField${upperFirstChar(name)}GridRowDef`;
};

export const processInitialValues = ({ fields = {}, item = null }) => {
  const values = Object.keys(fields).reduce((result, fieldName) => {
    const field = fields[fieldName];
    result[fieldName] = item ? item[fieldName] : field.defaultValue || null;
    return result;
  }, {});
  values.id = getEntityId(item);
  return values;
};

export const processInitialRowValue = ({ columns = [] }) => {
  const values = columns.reduce((result, column) => {
    const { name } = column;
    result[name] = column.defaultValue || null;
    return result;
  }, {});
  values[UUID] = new Date().getTime();
  return values;
};

export const reduceSelectedItem = ({ selectedItem }) => callback => {
  if (!callback) {
    return selectedItem;
  }

  return callback({ selectedItem });
};

export const reduceModifiedItem = ({ modifiedItem }) => callback => {
  if (!callback) {
    return modifiedItem;
  }

  return callback({ modifiedItem });
};

export const validateBeforeSave = ({ modifiedItem, validateStrategy }) => callback => {
  if (!callback) {
    return modifiedItem;
  }

  return callback({ modifiedItem, validateStrategy });
};

export const fieldCellChanged = ({ fieldName, cellName, cellValue, rowIndex }) => callback => {
  if (!(callback && cellName && fieldName)) {
    return;
  }
  callback({ cellName, cellValue, rowIndex });
};

export const fieldChanged = ({ fieldName, value, event }) => (
  fieldNameEventChanged,
  fieldNameChanged,
  genericFieldChanged
) => {
  if (!((fieldNameEventChanged || fieldNameChanged || fieldChanged) && fieldName)) {
    return;
  }

  if (fieldNameEventChanged && event) {
    fieldNameEventChanged({ value })(event);
    return;
  }
  if (fieldNameChanged) {
    fieldNameChanged({ value, event });
    return;
  }

  if (genericFieldChanged) {
    genericFieldChanged({ fieldName, value, event });
  }
};

export const validateFields = ({ fields, formValues = {}, validateStrategy, emitEvent }) => {
  return Object.keys(fields).reduce(
    (result, fieldName) => {
      const { errors } = result;
      const field = fields[fieldName];
      const fieldValue = formValues[fieldName];

      if (!validateField({ field, fieldValue })) {
        errors[fieldName] = true;
        result.disabled = true;
      }

      if (!errors[fieldName] && emitEvent) {
        const valid = emitEvent(createFieldEventEmitter(fieldName, 'validate'), {
          fieldValue,
          formValues,
          validateStrategy,
        });
        if (valid === false) {
          errors[fieldName] = true;
          result.disabled = true;
        }
      }
      return result;
    },
    { disabled: false, errors: {} }
  );
};
