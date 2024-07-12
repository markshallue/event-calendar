import dayjs from 'dayjs';

import { EMPTY_EVENT } from './EMPTY_EVENT';
import { DEFAULT_STATE } from './DEFAULT_STATE';
import { CalendarAction, CalendarState } from '~/types';

export function reducer(state: CalendarState, action: CalendarAction): CalendarState {
	switch (action.type) {
		// Reset to deafult interaction state (keep existing data and filtering config)
		case 'reset_to_default': {
			return {
				...state,
				...DEFAULT_STATE,
			};
		}

		// General
		case 'open_overflow': {
			return {
				...state,
				...DEFAULT_STATE,

				overflowIsOpen: true,
				overflowAnchor: action.anchor || state.overflowAnchor,
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
		case 'view_calendar_event': {
			return {
				...state,
				popoverDisplayType: 'view',
				clickedEvent: action.event || state.clickedEvent,
				eventAnchor: action.anchor || state.eventAnchor,
				placeholderEvent: EMPTY_EVENT,
			};
		}
		case 'edit_calendar_event': {
			return {
				...state,
				popoverDisplayType: 'edit',
				clickedEvent: action.event || state.clickedEvent,
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}

		// Drag creation
		case 'stop_drag_events': {
			return {
				...state,
				dragActive: false,
				firstClickDate: null,
				clickedEvent: EMPTY_EVENT,
				placeholderEvent: EMPTY_EVENT,
				eventDragActive: false,
				dragEventId: null,
				dragStartDate: null,
			};
		}
		case 'mouse_down': {
			return {
				...state,
				dragActive: true,
				firstClickDate: action.date || state.firstClickDate,
				placeholderEvent: { ...state.placeholderEvent, ...action.event, isActive: true },
			};
		}
		case 'mouse_up': {
			return {
				...state,
				dragActive: false,
				firstClickDate: null,
				popoverDisplayType: 'create',
				placeholderEvent: { ...state.placeholderEvent, isActive: true },
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}

		// Event drag & drop
		case 'set_hovered_date': {
			return {
				...state,
				hoveredDate: action.date || dayjs(),
			};
		}
		case 'event_drag_start': {
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
		case 'mouse_move': {
			return {
				...state,
				dragStartOffset: action.dragStartOffset ?? state.dragStartOffset,
				placeholderEvent: { ...state.placeholderEvent, ...action.event, id: null },
			};
		}
		case 'event_drag_end': {
			return {
				...state,
				eventDragActive: false,
				popoverDisplayType: 'drag-update',
				dragStartOffset: null,
				eventAnchor: action.anchor || state.eventAnchor,
			};
		}

		default:
			console.log(`Invalid action type ${action.type} passed to calendar reducer`);
			return state;
	}
}
