import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

/*
    Function that returns true if two date ranges overlap
*/
export function hasOverlap(start1: Dayjs, end1: Dayjs, start2?: Dayjs, end2?: Dayjs) {
	console.log('start1', start1);
	console.log('start2', start2);
	console.log('end1', end1);
	console.log('end2', end2);
	return (
		start1.isBetween(start2, end2, 'day', '[]') ||
		start2?.isBetween(start1, end1, 'day', '[]') ||
		end2?.isBetween(start1, end1, 'day', '[]')
	);
}
