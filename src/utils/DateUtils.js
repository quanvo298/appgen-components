import { parse, parseISO, format } from 'date-fns';
import { isNumber } from './StringUtils';

export const DATE_LONG_FORMAT = 'dd/MM/yyyy hh:mm:ss';

export const DATE_SHORT_FORMAT = 'dd/MM/yyyy';

export const SERVER_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";

export const NATIVE_DATE_FORM_COMPONENT_FORMAT = 'yyyy-MM-dd';

export const formatDateLong = date => format(date, DATE_LONG_FORMAT);

export const formatDateShort = date => format(date, DATE_SHORT_FORMAT);

export const formatToNativeDateFormComponent = date => {
  if (isNumber(date)) {
    return format(new Date(date), NATIVE_DATE_FORM_COMPONENT_FORMAT);
  }
  return format(date, NATIVE_DATE_FORM_COMPONENT_FORMAT);
};

export const parseDateFromUTC = dateUTCStr => parseISO(dateUTCStr);

export const parseDate = dateStr => parse(dateStr, SERVER_DATE_FORMAT, new Date());
