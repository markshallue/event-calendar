import { Dayjs } from 'dayjs';

/*
    Function that returns true if two date ranges overlap
*/
export function hasOverlap(start1: Dayjs, end1: Dayjs, start2?: Dayjs, end2?: Dayjs) {
	return (
		start1.isBetween(start2, end2, 'day', '[]') ||
		start2?.isBetween(start1, end1, 'day', '[]') ||
		end2?.isBetween(start1, end1, 'day', '[]')
	);
}
