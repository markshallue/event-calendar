import { Dayjs } from 'dayjs';

export function returnValidStartEnd(start: Dayjs, end: Dayjs) {
	return !end ? [start, start] : start.isSame(end) || start.isBefore(end) ? [start, end] : [end, start];
}
