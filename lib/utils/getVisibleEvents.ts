import { Dayjs } from 'dayjs';
import { OrderedCalendarEvent } from '~/types';

/*
    Returns the correct number of events for a cell without duplicates in a given week
*/
export function getVisibleEvents(data: OrderedCalendarEvent[], date: Dayjs, maxEvents: number, isInDayHeader: boolean) {
	return data.filter(
		({ order, start }) => order < maxEvents && (isInDayHeader || date.day() === 0 || date.isSame(start, 'day'))
	);
}
