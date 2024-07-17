import { ReactNode, useMemo, useRef } from 'react';
import dayjs from 'dayjs';
import classes from './EventsCalendar.module.css';

import {
	CalendarEvent,
	CalendarView,
	EventClickProps,
	EventEditProps,
	EventsCalendarContextMenuProps,
	EventsCalendarPopoverProps,
	RawCalendarEvent,
} from './types';

import { Month, Header, TimeView, OverflowCard } from './features';
import { EventsCalendarPopover, CircularLoader } from './components';
import { useMouseEvent, useInitEventsCalendar, EventsCalendarObject } from './hooks';

export interface EventsCalendarProps {
	calendar?: EventsCalendarObject;
	compact?: boolean;
	enableDragCreation?: boolean;
	enableRescheduling?: boolean;
	events?: CalendarEvent[] | RawCalendarEvent[];
	isFetching?: boolean;
	noHeader?: boolean;
	onEventClick?: (props: EventClickProps) => void;
	onEventCreate?: (props: EventEditProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderPopover?: (props: EventsCalendarPopoverProps) => ReactNode;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	views?: CalendarView[];
}

export function EventsCalendar({
	calendar,
	compact = false,
	enableDragCreation = false,
	enableRescheduling = false,
	events = [],
	isFetching = false,
	noHeader = false,
	onEventClick,
	onEventCreate,
	onEventReschedule,
	renderPopover,
	renderContextMenu,
	views = ['month', 'week', 'day'],
}: EventsCalendarProps) {
	// Initialise data calendar
	const { activeDate, setActiveDate, view, setView, state, dispatch } = useInitEventsCalendar(calendar);

	// Parse events to dayjs
	const eventsArray: CalendarEvent[] = useMemo(
		() => events.map(e => ({ ...e, start: dayjs(e.start), end: dayjs(e.end), dragId: null })),
		[events]
	);

	// Main reducer
	const { eventAnchor, popoverIsOpen, clickedEvent, placeholderEvent } = state;

	// Popover
	const onClose = () => dispatch({ type: 'reset_calendar' });
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'event_create_stop' });
	};

	// Placeholder ref
	const placeholderRef = useRef<HTMLDivElement>(null);

	// Mouse event handler
	const handleMouseEvent = useMouseEvent({ enableDragCreation, dispatch, state, onEventCreate });

	return (
		<div className={classes.calendarWrapper}>
			{noHeader ? null : (
				<Header view={view} dispatch={dispatch} setDate={setActiveDate} setView={setView} date={activeDate} views={views} />
			)}
			<div
				className={classes.calendar}
				style={{ height: noHeader ? '100%' : 'calc(100% - 52px)' }}
				onClick={e => e.stopPropagation()}
			>
				<CircularLoader visible={isFetching} />
				{view === 'month' ? (
					<Month
						enableRescheduling={enableRescheduling}
						compact={compact}
						activeDate={activeDate}
						dispatch={dispatch}
						eventsArray={eventsArray}
						handleMouseEvent={handleMouseEvent}
						handleStopDrag={handleStopDrag}
						onEventClick={onEventClick}
						onEventReschedule={onEventReschedule}
						placeholderRef={placeholderRef}
						renderContextMenu={renderContextMenu}
						state={state}
					/>
				) : (
					<TimeView
						view={view}
						enableRescheduling={enableRescheduling}
						compact={compact}
						activeDate={activeDate}
						dispatch={dispatch}
						eventsArray={eventsArray}
						handleMouseEvent={handleMouseEvent}
						handleStopDrag={handleStopDrag}
						onEventClick={onEventClick}
						onEventReschedule={onEventReschedule}
						placeholderRef={placeholderRef}
						renderContextMenu={renderContextMenu}
						state={state}
					/>
				)}
				{renderPopover && eventAnchor && (
					<EventsCalendarPopover isOpen={popoverIsOpen} anchor={eventAnchor} zIndex={501}>
						{renderPopover({ onClose, clickedEvent, newEvent: placeholderEvent })}
					</EventsCalendarPopover>
				)}
				<OverflowCard
					compact={compact}
					dispatch={dispatch}
					events={view === 'week' ? eventsArray.filter(event => event.isAllDay) : eventsArray}
					placeholderRef={placeholderRef}
					onEventClick={onEventClick}
					renderContextMenu={renderContextMenu}
					state={state}
					enableRescheduling={enableRescheduling}
				/>
			</div>
		</div>
	);
}
