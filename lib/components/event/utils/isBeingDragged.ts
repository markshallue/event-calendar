import { CalendarEvent, CalendarState } from '~/types';

export function isBeingDragged(state: CalendarState, event: CalendarEvent) {
	return !event.isActive && event.id === state.placeholderEvent.dragId;
}
