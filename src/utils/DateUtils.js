import { parseISO, format } from 'date-fns';

export const DATE_LONG_FORMAT = 'dd/MM/yyyy hh:mm:ss';

export const formatDateLong = date => format(date, DATE_LONG_FORMAT);

export const parseDateFromUTC = dateUTCStr => parseISO(dateUTCStr);
