import { CalendarEvent, CalendarState } from '~/types';

export function isBeingDragged(isMonthEvent: boolean, state: CalendarState, event: CalendarEvent) {
	// Month view event
	if (isMonthEvent) return state.eventDragActive && (event.id === null || event.id === state.placeholderEvent.dragId);

	// Week or day view event
	return event.id === state.placeholderEvent.dragId;
}
