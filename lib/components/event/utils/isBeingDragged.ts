import { CalendarEvent, CalendarState } from '~/types';

export function isBeingDragged(isMonthEvent: boolean, state: CalendarState, event: CalendarEvent) {
	// Month view event
	if (isMonthEvent) return state.eventDragActive && (event.id === null || event.id === state.placeholderEvent.dragId);

	// Week or day view event
	return (
		// Hide event when it is being dragged
		(state.eventDragActive && event.id === state.placeholderEvent.dragId) ||
		// Also hide while confirmation popup is visible after drag
		(event.id === state.placeholderEvent.dragId && state.popoverDisplayType === 'drag-update')
	);
}
