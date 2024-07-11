import { CalendarEvent, OrderedCalendarEvent } from '~/types';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);

/* 
    If event has no end field or no answer, return midnight if allDay, otherwise one hour event
	If event is all day and start is after end, return start (single day event)
	If event has a start time but no end time, return a one-hour event
*/
export function returnValidEnd(event: object, endField: string, isAllDay: boolean, start: Dayjs, endTest: Dayjs) {
	return endField && endField in event
		? isAllDay
			? start.isSameOrBefore(endTest, 'd')
				? endTest
				: start
			: start.hour(endTest.hour()).minute(endTest.minute()).isBefore(start) || start.isSame(endTest)
			? endTest.hour(start.add(1, 'hour').hour()).minute(start.minute())
			: endTest
		: isAllDay
		? start.hour(0).minute(0)
		: start.add(1, 'hour');
}

export function humanize(value: string) {
	// if (typeof value !== 'string') return value;
	const str = value
		.replace(/([a-z\d])([A-Z]+)/g, '$1 $2')
		.replace(/\W|_/g, ' ')
		.trim()
		.toLowerCase();
	return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

// export function sortBy(data, field, dir = 'desc') {
// 	if (isFalseArray(data)) return [];

// 	return dir === 'desc'
// 		? data.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0))
// 		: data.sort((a, b) => (a[field] < b[field] ? 1 : b[field] < a[field] ? -1 : 0));
// }

export function getDateTimeLabel(start: Dayjs, end: Dayjs, startTime?: string, endTime?: string, isAllDay?: boolean) {
	if (!start) return 'Wednesday November 3';
	const isMultiDay = end && !dayjs(end).isSame(dayjs(start), 'd');
	const hasTime = !isAllDay && startTime;
	return `${start.format('dddd MMMM D')}${isMultiDay ? ` - ${dayjs(end).format('dddd MMMM D')}` : ''}${
		hasTime ? `, ${startTime} - ${endTime}` : ''
	}`;
}

/*
    Filters events by date
*/
export function filterByDate(
	data: OrderedCalendarEvent[] | CalendarEvent[],
	date: Dayjs
): OrderedCalendarEvent[] | CalendarEvent[] {
	return data.filter(({ start, end }) => date.isBetween(start, end, 'day', '[]'));
}

/*
    Returns the correct number of events for a cell without duplicates in a given week
*/
export function getVisibleEvents(data: OrderedCalendarEvent[], date: Dayjs, maxEvents: number, isDayHeader: boolean) {
	return data.filter(
		({ order, start }) => order < maxEvents && (isDayHeader || date.day() === 0 || date.isSame(start, 'day'))
	);
}

// export function truncateText(text, length = 35) {
// 	if (text.length <= length) return text;
// 	return text.substr(0, length) + '\u2026';
// }

// export function isEqualOrInArray(test, array) {
// 	if (!test || !array) return false;
// 	return Array.isArray(array) ? array.includes(test) : array === test;
// }

// export function mapToSelect(data, field = 'Label') {
// 	return (
// 		data.map(event => ({
// 			value: event.eventId.toString(),
// 			label: event[field],
// 		})) || []
// 	);
// }

export function splitColourCSS(colorArray: string[]) {
	const increment = 100 / colorArray.length;
	const values = colorArray.map((color, i) => `${color} ${increment * i}% ${increment * i + increment}%`).join(', ');
	return `-webkit-linear-gradient(-30deg,${values})`;
}
