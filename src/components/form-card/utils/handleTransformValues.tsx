import dayjs from 'dayjs';
import { CalendarFields, FormCardReturnValues, FormCardValues } from '../types';

import { convertStringToDate } from './convertStringToDate';

export const handleTransformValues = (
  values: FormCardValues,
  fields: CalendarFields
): FormCardReturnValues => {
  const { hour: startHour, minute: startMinute } = convertStringToDate(values.startTime);
  const { hour: endHour, minute: endMinute } = convertStringToDate(values.endTime);
  const start = fields.start ? dayjs(values.start).hour(startHour).minute(startMinute) : undefined;
  const end = fields.end ? dayjs(values.end).hour(endHour).minute(endMinute) : start || dayjs(); // One of start and end must be defined. Else just use today
  return {
    ...values,
    start: start || end, // Cannot be undefined. Defaults to end in the case that only end is defined
    end: end,
    group: Array.isArray(values.group) ? values.group : [values.group],
  };
};
