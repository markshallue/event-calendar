import dayjs, { Dayjs } from 'dayjs';

export function getDateTimeLabel(start: Dayjs, end: Dayjs, startTime?: string, endTime?: string, isAllDay?: boolean) {
	if (!start) return 'Wednesday November 3';
	const isMultiDay = end && !dayjs(end).isSame(dayjs(start), 'd');
	const hasTime = !isAllDay && startTime;
	return `${start.format('dddd MMMM D')}${isMultiDay ? ` - ${dayjs(end).format('dddd MMMM D')}` : ''}${
		hasTime ? `, ${startTime} - ${endTime}` : ''
	}`;
}
