import { Dayjs } from 'dayjs';

import { CalendarEvent, OrderedCalendarEvent } from '~/types';
import { isBetween } from './isBetween';

export function filterByDate(
	data: OrderedCalendarEvent[] | CalendarEvent[],
	date: Dayjs
): OrderedCalendarEvent[] | CalendarEvent[] {
	return data.filter(({ start, end }) => isBetween(date, start, end));
}
