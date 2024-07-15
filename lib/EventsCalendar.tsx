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

import { Day } from './features/day';
import { Week } from './features/week';
import { Month } from './features/month';
import { OverflowCard } from './features/overflow-card';
import { DefaultHeader } from './features/default-header/DefaultHeader';

import { EventsCalendarPopover, CircularLoader } from './components';
import { useMouseEvent, useInitEventsCalendar, EventsCalendarObject } from './hooks';

export interface EventsCalendarProps {
	calendar?: EventsCalendarObject;
	compact?: boolean;
	enableDragCreation?: boolean;
	enableRescheduling?: boolean;
	events?: CalendarEvent[] | RawCalendarEvent[];
	height?: string | number;
	isFetching?: boolean;
	renderPopover?: (props: EventsCalendarPopoverProps) => ReactNode;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	noHeader?: boolean;
	onEventClick?: (props: EventClickProps) => void;
	onEventCreate?: (props: EventEditProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	views?: CalendarView[];
	children?: ReactNode;
}

export function EventsCalendar({
	calendar,
	compact = false,
	enableDragCreation = false,
	enableRescheduling = false,
	events = [],
	height = 550,
	isFetching = false,
	renderPopover,
	renderContextMenu,
	noHeader = false,
	onEventClick,
	onEventCreate,
	onEventReschedule,
	views = ['month', 'week', 'day'],
	children,
}: EventsCalendarProps) {
	// Initialise data calendar
	const { activeDate, setActiveDate, view, setView, state, dispatch } = useInitEventsCalendar(calendar);

	// Parse events to dayjs
	const eventsArray: CalendarEvent[] = useMemo(
		() => events.map(e => ({ ...e, start: dayjs(e.start), end: dayjs(e.end), dragId: null })),
		[events]
	);

	// Main reducer
	const { eventAnchor, popoverIsOpen, popoverEvent, clickedEvent, placeholderEvent } = state;

	// Popover
	const onClose = () => dispatch({ type: 'reset_calendar' });

	// Placeholder ref
	const placeholderRef = useRef<HTMLDivElement>(null);

	// Mouse event handler
	const handleMouseEvent = useMouseEvent({ enableDragCreation, dispatch, state, onEventCreate });

	return (
		<div style={{ width: '100%', height: height }}>
			{noHeader ? null : (
				<DefaultHeader
					view={view}
					dispatch={dispatch}
					setDate={setActiveDate}
					setView={setView}
					date={activeDate}
					views={views}
				/>
			)}
			<div className={classes.wrapper} style={{ height: noHeader ? '100%' : 'calc(100% - 52px)' }}>
				{/* Sidebar could go here */}
				<div className={classes.EventsCalendar}>
					<CircularLoader visible={isFetching} />
					{view === 'month' ? (
						<Month
							enableRescheduling={enableRescheduling}
							compact={compact}
							activeDate={activeDate}
							dispatch={dispatch}
							eventsArray={eventsArray}
							handleMouseEvent={handleMouseEvent}
							onEventClick={onEventClick}
							onEventReschedule={onEventReschedule}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					) : view === 'week' ? (
						<Week
							enableRescheduling={enableRescheduling}
							compact={compact}
							activeDate={activeDate}
							dispatch={dispatch}
							eventsArray={eventsArray}
							handleMouseEvent={handleMouseEvent}
							onEventClick={onEventClick}
							onEventReschedule={onEventReschedule}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					) : (
						<Day
							enableRescheduling={enableRescheduling}
							compact={compact}
							activeDate={activeDate}
							dispatch={dispatch}
							eventsArray={eventsArray}
							handleMouseEvent={handleMouseEvent}
							onEventClick={onEventClick}
							onEventReschedule={onEventReschedule}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					)}
					{renderPopover && eventAnchor && (
						<EventsCalendarPopover isOpen={popoverIsOpen} anchor={eventAnchor} zIndex={501}>
							{renderPopover({ onClose, event: popoverEvent === 'clickedEvent' ? clickedEvent : placeholderEvent })}
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
					{children}
				</div>
			</div>
		</div>
	);
}
