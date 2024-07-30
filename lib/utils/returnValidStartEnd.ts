import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

export function returnValidStartEnd(start: Dayjs, end: Dayjs) {
	return !end ? [start, start] : start.isSameOrBefore(end) ? [start, end] : [end, start];
}
