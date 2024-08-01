import dayjs from 'dayjs';
import { FormPopoverReturnValues, FormPopoverValues } from '../types';

import { CalendarFormFields } from '@/types';

import { convertStringToDate } from './convertStringToDate';

export const handleTransformValues = (
	values: FormPopoverValues,
	fields: CalendarFormFields
): FormPopoverReturnValues => {
	const { hour: startHour, minute: startMinute } = convertStringToDate(values.startTime);
	const { hour: endHour, minute: endMinute } = convertStringToDate(values.endTime);
	const start = fields.start ? dayjs(values.start).hour(startHour).minute(startMinute) : undefined;
	const end = fields.end ? dayjs(values.end).hour(endHour).minute(endMinute) : start || dayjs(); // One of start and end must be defined. Else just use today
	return {
		...values,
		start: start || end, // Cannot be undefined. Defaults to end in the case that only end is defined
		end: end,
		groups: Array.isArray(values.groups) ? values.groups : [values.groups],
	};
};
