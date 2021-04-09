import { PropertyDataType } from '../utils/constant';
import { isBlank, isNotBlank } from '../utils/StringUtils';
import { isNotEmpty } from '../utils/CollectionUtils';

export const validateField = ({ field, fieldValue }) => {
  const { required, type } = field;
  if (required && PropertyDataType.ArrayObject === type) {
    return isNotEmpty(fieldValue);
  }

  if (required && !fieldValue) {
    return false;
  }

  if (required) {
    return isNotBlank(fieldValue.toString());
  }
  return true;
};

export const validateElement = (element, newValue) => {
  if (element.required && PropertyDataType.ArrayObject === element.type) {
    return isNotEmpty(newValue);
  }

  if (element.required && !newValue) {
    return false;
  }

  if (element.required) {
    return isNotBlank(newValue.toString());
  }
  return true;
};

const buildValidatorStrategy = ({ polyglot }) => {
  return {
    elementErrors: [],
    globalErrors: [],

    addGlobalError(message) {
      this.globalErrors.push({ error: message });
    },

    addError(name, label, message) {
      const errorObj = { name: name.trim().toLowerCase(), error: message };
      if (isBlank(message)) {
        errorObj.error = polyglot.t('message.error.invalid', {
          label: isNotBlank(label) ? label : name,
        });
      }
      this.elementErrors.push(errorObj);
    },

    addExistedError(name, label, value) {
      this.addError(
        name,
        label,
        polyglot.t('message.error.existed', {
          label: `${isNotBlank(label) ? label : name} ${isNotBlank(value) && `: ${value}`}`,
        })
      );
    },

    hasErrors() {
      return isNotEmpty(this.elementErrors) || isNotEmpty(this.globalErrors);
    },

    hasError(name) {
      if (isNotBlank(name)) {
        return this.elementErrors.find(_ele => _ele.name === name.trim().toLowerCase());
      }
      return false;
    },

    getErrorMessages() {
      let errorMsg = '';
      this.elementErrors.forEach(_element => {
        errorMsg += `<p>${_element.error}`;
      });
      return errorMsg;
    },

    getErrors() {
      const elementMessageErrors = this.elementErrors.map(({ error }) => error);
      const globalMessageErrors = this.globalErrors.map(({ error }) => error);
      return [...elementMessageErrors, ...globalMessageErrors];
    },
  };
};

export const createValidatorStrategy = ({ polyglot }) => buildValidatorStrategy({ polyglot });
