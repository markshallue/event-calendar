import { Dayjs } from 'dayjs';
import { isBetween } from './isBetween';

/*
    Function that returns true if two date ranges overlap
*/
export function hasOverlap(start1: Dayjs, end1: Dayjs, start2: Dayjs, end2: Dayjs) {
	return isBetween(start1, start2, end2) || isBetween(start2, start1, end1) || isBetween(end2, start1, end1);
}
