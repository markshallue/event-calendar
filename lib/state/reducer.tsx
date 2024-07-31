import { EMPTY_EVENT } from './EMPTY_EVENT';
import { DEFAULT_STATE } from './DEFAULT_STATE';
import { CalendarAction, CalendarState } from '~/types';

export function reducer(state: CalendarState, action: CalendarAction): CalendarState {
	switch (action.type) {
		// Reset to deafult state
		case 'reset_calendar': {
			return DEFAULT_STATE;
		}

		// Overflow
		case 'open_overflow': {
			return {
				...state,
				...DEFAULT_STATE,

				overflowIsOpen: true,
				overflowAnchor: action.anchor || state.overflowAnchor,
			};
		}

		// Popover
		case 'open_popover': {
			return {
				...state,
				popoverIsOpen: true,
			};
		}

		// Context menu
		case 'open_context_menu': {
			return {
				...state,
				clickedEvent: action.event || state.clickedEvent,
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}

		// Calendar event interaction
		case 'set_clicked_event': {
			return {
				...state,
				clickedEvent: action.event || state.clickedEvent,
				eventAnchor: action.anchor || state.eventAnchor,
				placeholderEvent: EMPTY_EVENT,
			};
		}

		// Update event
		case 'update_event': {
			return {
				...state,
				dragStartOffset: action.dragStartOffset ?? state.dragStartOffset,
				placeholderEvent: { ...state.placeholderEvent, ...action.event, id: null },
			};
		}

		// Drag creation
		case 'event_create_start': {
			return {
				...state,
				dragActive: true,
				firstClickDate: action.date || state.firstClickDate,
				placeholderEvent: { ...state.placeholderEvent, ...action.event, isActive: true },
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}
		case 'event_create_end': {
			return {
				...state,
				dragActive: false,
				firstClickDate: null,
				placeholderEvent: { ...state.placeholderEvent, isActive: true },
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}
		case 'event_create_stop': {
			return {
				...state,
				dragActive: false,
				firstClickDate: null,
				clickedEvent: EMPTY_EVENT,
				placeholderEvent: EMPTY_EVENT,
				eventDragActive: false,
			};
		}

		// Event drag & drop rescheduling
		case 'event_reschedule_start': {
			return {
				...state,
				eventDragActive: true,
				clickedEvent: action.event || state.clickedEvent,
				placeholderEvent: {
					...state.placeholderEvent,
					order: 0,
					...action.event,
					id: null,
					isActive: true,
				},
			};
		}
		case 'event_reschedule_end': {
			return {
				...state,
				eventDragActive: false,
				dragStartOffset: null,
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}

		default:
			console.log(`Invalid action type ${action.type} passed to calendar reducer`);
			return state;
	}
}
