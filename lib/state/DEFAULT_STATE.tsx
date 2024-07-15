import { CalendarState } from '../types';
import { EMPTY_EVENT } from './EMPTY_EVENT';

export const DEFAULT_STATE: CalendarState = {
	// View/edit event
	clickedEvent: EMPTY_EVENT,
	popoverIsOpen: false,
	eventAnchor: null,

	// Drag creation
	dragActive: false,
	firstClickDate: null,
	placeholderEvent: EMPTY_EVENT,

	// Event Drag & drop
	dragStartOffset: null,
	eventDragActive: false,

	// Overflow Popover
	overflowAnchor: null,
	overflowIsOpen: false,
};
