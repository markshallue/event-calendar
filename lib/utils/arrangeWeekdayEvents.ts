import { Dayjs } from 'dayjs';

import { CalendarEvent, OrderedCalendarEvent } from '~/types';

import { setTime } from './setTime';
import { getTimeDiff } from './getTimeDiff';
import { isBetween } from './isBetween';

/*
    Function that sorts events by start time, from earliest to latest.
    Only sort arrays with at least 2 events.
*/
function sortByStart(array: CalendarEvent[]) {
	if (array.length < 2) return array;

	return array.sort((a, b) => {
		const timeDiff = getTimeDiff(a.start, b.start);
		return timeDiff > 0 ? -1 : timeDiff < 0 ? 1 : 0;
	});
}

/*
    Function that checks if the start of a test event overlaps with another event
*/
function overlapsStart(test_start: Dayjs, start_2: Dayjs, end_2: Dayjs) {
	return isBetween(test_start, start_2, end_2, true);
}

/*
    Function that takes an array of events for a single day and orders & indents them based on overlaps
*/
export function arrangeWeekdayEvents(dayEvents: CalendarEvent[], date: Dayjs): OrderedCalendarEvent[] {
	if (dayEvents.length < 2) return dayEvents.map(event => ({ ...event, order: 0, indent: 0 }));

	// Sort events by start time
	const sortedEvents = sortByStart(dayEvents);

	// Extract first event from array and place it first with no indent
	const firstEvent = sortedEvents.shift()!;
	const orderedArray: OrderedCalendarEvent[] = [{ ...firstEvent, order: 0, indent: 0 }];

	// Now loop through all other events and add them to the ordered array
	sortedEvents.forEach((testEvent, index) => {
		// Set the time for the test event to the correct day
		const tempStart_test = setTime(date, testEvent.start);

		// We loop through each event and compare them to the other events already added to the ordered array
		// If the start of the test event overlaps with another event, we increment the indent by 1
		let eventIndent = 0;
		orderedArray.forEach(currEvent => {
			// Set the time for the comparison event to the correct day
			const tempStart_2 = setTime(date, currEvent.start);
			const tempEnd_2 = setTime(date, currEvent.end);

			if (overlapsStart(tempStart_test, tempStart_2, tempEnd_2)) {
				eventIndent += 1;
			}
		});

		// Add this event to the ordered array, noting its order and indent
		// (the array is already sorted so we use the index for ordering)
		orderedArray.push({ ...testEvent, order: index + 1, indent: eventIndent });
	});
	return orderedArray;
}
