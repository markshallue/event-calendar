import { CalendarEvent, OrderedCalendarEvent } from '~/types';
import { hasOverlap } from './hasOverlap';

/*
    Function that sorts an array in following order:
        1. Places longer events first
        2. Places earlier start dates first
        3. Places 'all day' events above events with a specified time
*/
export function calendarSort(weekEventsArray: CalendarEvent[]) {
	return weekEventsArray.sort((a, b) => {
		const a_lengthInDays = a.end.diff(a.start, 'd') + 1;
		const b_lengthInDays = b.end.diff(b.start, 'd') + 1;
		return a_lengthInDays > b_lengthInDays
			? -1
			: a_lengthInDays < b_lengthInDays
			? 1
			: a.start.isBefore(b.start, 'd')
			? -1
			: b.start.isBefore(a.start, 'd')
			? 1
			: a.isAllDay && !b.isAllDay
			? -1
			: 0;
	});
}

/*
    Function that takes an array of events for a single week and arranges them to create a dense fit
*/
export function arrangeWeekEvents(weekEventsArray: CalendarEvent[]): OrderedCalendarEvent[] {
	if (weekEventsArray.length < 2) return weekEventsArray.map(event => ({ ...{ ...event, order: 0 } }));

	// Sort events by start date, then length, then duration
	const sortedWeekEvents = calendarSort(weekEventsArray);

	// Extract first event from array and place as in first (top) slot/position
	const firstEvent = sortedWeekEvents.shift()!;
	const orderedArray = [{ ...firstEvent, order: 0 }];

	// Now loop through all other events and add them to the ordered array
	sortedWeekEvents.forEach(testEvent => {
		// We do this by assigning 'slots' to each month cell, e.g. slot 0, slot 1 and slot 2 from top to bottom
		// We loop through each event and compare them to the other events already added to the ordered array
		// If an event overlaps with another, we take note of the 'slot' at which the overlap occurs and store it in an array
		const overlappingSlots: number[] = [];
		const testEventEnd = testEvent.end || testEvent.start; // Use start if end is null
		orderedArray.forEach(currEvent => {
			const currEventEnd = currEvent.end || currEvent.start; // Use start if end is null
			if (hasOverlap(testEvent.start, testEventEnd, currEvent.start, currEventEnd)) {
				overlappingSlots.push(currEvent.order);
			}
		});

		// We then find the lowest slot that is not included in this array (and therefore is a slot that is not already filled)
		let eventOrder = 0;
		while (overlappingSlots.includes(eventOrder)) eventOrder += 1;

		// Add this event to the ordered array, along with its allocated slot
		orderedArray.push({ ...testEvent, order: eventOrder });
	});
	return orderedArray;
}
