import dayjs from 'dayjs';
import { CalendarState } from '../types';
import { EMPTY_EVENT } from './EMPTY_EVENT';

export const DEFAULT_STATE: CalendarState = {
  // View/edit event
  clickedEvent: EMPTY_EVENT,
  eventAnchor: null,
  popoverDisplayType: 'hidden',

  // Drag creation
  dragActive: false,
  firstClickDate: null,
  placeholderEvent: EMPTY_EVENT,

  // Event Drag & drop
  hoveredDate: dayjs(),
  dragStartOffset: null,
  eventDragActive: false,
  dragEventId: null,
  dragStartDate: null,
  dragEndDate: null,

  // Overflow Popover
  overflowAnchor: null,
  overflowIsOpen: false,
};
