import { Dayjs } from 'dayjs';
import { MouseEvent, RefObject } from 'react';

export type RelatedForm = {
	label: string;
	fid: string | number;
	allowMultiple?: boolean;
};

export type CalendarView = 'month' | 'week' | 'day';

export interface RawCalendarEvent {
	id: number;
	title: string;
	start: string | number | Date | Dayjs;
	end: string | number | Date | Dayjs;
	groups?: { label: string; color: string }[];
	[key: string]: unknown; // Any other properties
}
export interface CalendarEvent {
	id: number | null;
	title: string;
	start: Dayjs;
	end: Dayjs;
	isAllDay?: boolean;
	startTime?: string;
	endTime?: string;
	groups?: { label: string; color: string }[];
	content?: { label: string; content: string | { label: string; color: string }[] }[];
	images?: string[];
	info?: string;
	dragId: number | null;
	[key: string]: unknown; // Any other properties
}

export interface OrderedCalendarEvent extends CalendarEvent {
	order: number;
	indent: number;
}

export type SubmitType = 'create' | 'delete' | 'update';

export type MouseEventHandler = {
	(e: MouseEvent, date: Dayjs, isTimeEntry: boolean, placeholderRef: RefObject<HTMLDivElement>): void;
};

export type DateRecord = { date: Dayjs; isCurrentMonth?: boolean };

export interface MinMaxDatesInView {
	first: Dayjs;
	last: Dayjs;
}

export interface MonthDates extends MinMaxDatesInView {
	weeks: DateRecord[][];
}

export interface EventsCalendarPopoverProps {
	event: CalendarEvent | null;
	onClose: () => void;
}

export interface EventsCalendarContextMenuProps {
	event: CalendarEvent;
	onClose: () => void;
	openPopover: () => void;
	closeContextMenu: () => void;
}

type CalendarActionType =
	| 'reset_to_default'
	| 'view_calendar_event'
	| 'stop_drag_events'
	| 'mouse_down'
	| 'mouse_move'
	| 'mouse_up'
	| 'open_overflow'
	| 'event_drag_start'
	| 'event_drag_end'
	| 'open_popover'
	| 'open_context_menu';

export interface CalendarAction {
	activeFilters?: string[];
	activeGroups?: string[];
	event?: CalendarEvent | OrderedCalendarEvent;
	anchor?: HTMLDivElement | null;
	date?: Dayjs;
	newView?: CalendarView;
	type: CalendarActionType;
	dragStartOffset?: number | null;
}

export interface PlaceholderEvent extends OrderedCalendarEvent {
	isActive: boolean;
}

export interface CalendarState {
	// Entry Popover
	clickedEvent: CalendarEvent;
	popoverIsOpen: boolean;
	eventAnchor: HTMLDivElement | null;
	popoverEvent: 'clickedEvent' | 'placeholder';

	// Drag creation
	dragActive: boolean;
	firstClickDate: Dayjs | null;
	placeholderEvent: PlaceholderEvent;

	// Event Drag & drop
	dragStartOffset: number | null;
	eventDragActive: boolean;

	// Overflow Popover
	overflowAnchor: HTMLDivElement | null;
	overflowIsOpen: boolean;
}

export type EventClickProps = {
	event: CalendarEvent;
	isDoubleClick: boolean;
	eventRef: HTMLDivElement;
	openPopover: () => void;
};
export type EventEditProps = { event: CalendarEvent; eventRef: HTMLDivElement; openPopover: () => void };
