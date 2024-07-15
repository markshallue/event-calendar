import { EventsCalendarObject, useEventsCalendar } from './useEventsCalendar';

export function useInitEventsCalendar(calendar?: EventsCalendarObject): EventsCalendarObject {
	const isInitialised = !!calendar;
	const defaultCalendar = useEventsCalendar({ isInitialised });

	return calendar || defaultCalendar;
}
