import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { CalendarEvent, OrderedCalendarEvent } from '~/types';

export function filterByDate(
	data: OrderedCalendarEvent[] | CalendarEvent[],
	date: Dayjs
): OrderedCalendarEvent[] | CalendarEvent[] {
	return data.filter(({ start, end }) => date.isBetween(start, end, 'day', '[]'));
}
