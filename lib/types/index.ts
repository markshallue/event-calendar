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
  entryId: number | null;
  title: string;
  start: string | number | Date | Dayjs;
  end: string | number | Date | Dayjs;
  groups?: { label: string; color: string }[];
  filter?: string[];
  [key: string]: unknown; // Any other properties
}
export interface CalendarEvent extends RawCalendarEvent {
  start: Dayjs;
  end: Dayjs;
  isAllDay?: boolean;
  startTime?: string;
  endTime?: string;
  groups?: { label: string; color: string }[];
  content?: { label: string; content: string | { label: string; color: string }[] }[];
  filter?: string[];
  images?: string[];
  info?: string;
  dragId?: number;
  [key: string]: unknown; // Any other properties
}

export interface OrderedCalendarEvent extends CalendarEvent {
  order: number;
}
export interface CalendarTimeEvent extends OrderedCalendarEvent {
  indent: number;
}

export type SubmitType = 'create' | 'delete' | 'update';

export type MouseEventHandler = {
  (
    e: MouseEvent,
    date: Dayjs,
    isTimeEntry: boolean,
    placeholderRef: RefObject<HTMLDivElement>
  ): void;
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
  onClose: () => void;
  setPopoverType: (type: 'view' | 'edit') => void;
  event: CalendarEvent;
}

export interface EventsCalendarContextMenuProps {
  event: CalendarEvent;
  onClose: () => void;
  setPopoverType: (type: 'view' | 'edit') => void;
  closeContextMenu: () => void;
}

type CalendarActionType =
  | 'reset_to_default'
  | 'view_calendar_event'
  | 'edit_calendar_event'
  | 'stop_drag_events'
  | 'mouse_down'
  | 'mouse_move'
  | 'mouse_up'
  | 'open_overflow'
  | 'event_drag_start'
  | 'event_drag_end'
  | 'open_context_menu'
  | 'set_hovered_date';

export interface CalendarAction {
  activeFilters?: string[];
  activeGroups?: string[];
  event?: CalendarEvent | CalendarTimeEvent;
  anchor?: HTMLDivElement | null;
  date?: Dayjs;
  newView?: CalendarView;
  type: CalendarActionType;
  dragEventId?: number;
  dragStartDate?: Dayjs;
  dragEndDate?: Dayjs;
  popoverDisplayType?: PopoverDisplayType;
  dragStartOffset?: number | null;
}

export interface PlaceholderEvent extends CalendarTimeEvent {
  isActive: boolean;
}

export type PopoverDisplayType = 'hidden' | 'create' | 'view' | 'edit' | 'drag-update';

export interface CalendarState {
  // Entry Popover
  clickedEvent: CalendarEvent;
  eventAnchor: HTMLDivElement | null;
  popoverDisplayType: PopoverDisplayType;

  // Drag creation
  dragActive: boolean;
  firstClickDate: Dayjs | null;
  placeholderEvent: PlaceholderEvent;

  // Event Drag & drop
  hoveredDate: Dayjs;
  dragStartOffset: number | null;
  eventDragActive: boolean;
  dragEventId: null | number;
  dragStartDate: Dayjs | null;
  dragEndDate: Dayjs | null;

  // Overflow Popover
  overflowAnchor: HTMLDivElement | null;
  overflowIsOpen: boolean;
}
