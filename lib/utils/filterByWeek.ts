import { Dayjs } from 'dayjs';
import { CalendarEvent } from '~/types';
import { hasOverlap } from './hasOverlap';

/*
    Function that returns an array of events that overlap a week with given weekStartDate
*/
export function filterByWeek(array: CalendarEvent[], weekStartDate: Dayjs) {
	const weekEndDate = weekStartDate.add(6, 'd');
	return array.filter(({ start, end }) => {
		const eventEnd = end || start; // Take event start if end is null
		return hasOverlap(weekStartDate, weekEndDate, start, eventEnd);
	});
}
