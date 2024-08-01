import dayjs from 'dayjs';
import { createDayjsObjFromTime } from '~/utils/createDayjsObjFromTime';

import { CalendarFormFields } from '@/types';
import { FormPopoverValues } from '../types';

export const validateValues = (fields: CalendarFormFields) => {
	return {
		title: (value: string) => (!value ? true : null),
		// group: (value: string[]) => (fields.group && (!value || value.length === 0) ? true : null),
		endTime: (value: string | null, values: FormPopoverValues) => {
			const endTime = value;
			// Start and end inputs not required
			if (!endTime && !values.startTime) return null;
			if (!dayjs(values.end).isSame(values.start, 'day')) return null;
			// But validate if they exist
			const { start, end } = createDayjsObjFromTime(values.startTime, endTime);
			const isError = start.isSame(end) || start.isAfter(end);
			return isError ? true : null;
		},
		end: (value: Date, values: FormPopoverValues) => {
			if (!(fields.start && fields.end)) return null;
			const start = dayjs(values.start);
			const isError = start.isAfter(value);
			return isError ? true : null;
		},
	};
};
