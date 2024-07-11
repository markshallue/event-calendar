import { Dayjs } from 'dayjs';

export function returnValidStartEnd(start: Dayjs, end: Dayjs) {
  return !end ? [start, start] : start.isSameOrBefore(end) ? [start, end] : [end, start];
}
