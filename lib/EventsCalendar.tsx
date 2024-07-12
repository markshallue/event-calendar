import { ReactNode, useMemo, useReducer, useRef } from 'react';
import dayjs from 'dayjs';
import classes from './EventsCalendar.module.css';

import {
	CalendarEvent,
	CalendarView,
	EventsCalendarContextMenuProps,
	EventsCalendarPopoverProps,
	RawCalendarEvent,
} from './types';

import { Day } from './features/day';
import { Week } from './features/week';
import { Month } from './features/month';
import { OverflowCard } from './features/overflow-card';
import { DefaultHeader } from './features/default-header/DefaultHeader';

import { Popover, CircularLoader } from './components';
import { useMouseEvent, useInitEventsCalendar, EventsCalendarObject } from './hooks';
import { DEFAULT_STATE, reducer } from './state';

export interface EventsCalendarProps {
	calendar?: EventsCalendarObject;
	compact?: boolean;
	enableDragCreation?: boolean;
	enableDragNDrop?: boolean;
	events?: CalendarEvent[] | RawCalendarEvent[];
	height?: string | number;
	isFetching?: boolean;
	renderViewPopover?: (props: EventsCalendarPopoverProps) => ReactNode;
	renderEditPopover?: (props: EventsCalendarPopoverProps) => ReactNode;
	renderCreatePopover?: (props: EventsCalendarPopoverProps) => ReactNode;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	views?: CalendarView[];
	noHeader?: boolean;
}

export function EventsCalendar({
	calendar,
	compact = false,
	enableDragCreation = false,
	enableDragNDrop = false,
	events = [],
	height = 550,
	renderViewPopover,
	renderCreatePopover,
	renderEditPopover,
	renderContextMenu,
	isFetching = false,
	noHeader = false,
	views = ['month', 'week', 'day'],
}: EventsCalendarProps) {
	// Initialise data calendar
	const { activeDate, setActiveDate, view, setView } = useInitEventsCalendar(calendar);

	// Parse events to dayjs format
	const eventsArray: CalendarEvent[] = useMemo(
		() => events.map(e => ({ ...e, start: dayjs(e.start), end: dayjs(e.end), dragId: null })),
		[events]
	);

	// Main reducer
	const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

	// Popover
	const onClose = () => dispatch({ type: 'reset_to_default' });
	const setPopoverType = (type: 'view' | 'edit') => {
		if (type === 'view') {
			dispatch({ type: 'view_calendar_event' });
		} else {
			dispatch({ type: 'edit_calendar_event' });
		}
	};
	const popoverIsOpen = state.popoverDisplayType !== 'hidden' && state.eventAnchor !== null;
	const hasViewPopover = !!renderViewPopover;
	const hasPopover = !!(renderViewPopover || renderEditPopover || renderCreatePopover);

	// Placeholder ref
	const placeholderRef = useRef<HTMLDivElement>(null);

	// Mouse event handler
	const handleMouseEvent = useMouseEvent({ enableDragCreation, dispatch, state });

	return (
		<div style={{ width: '100%', height: height }}>
			{noHeader ? null : (
				<DefaultHeader view={view} setDate={setActiveDate} setView={setView} date={activeDate} views={views} />
			)}
			<div className={classes.wrapper} style={{ height: noHeader ? '100%' : 'calc(100% - 52px)' }}>
				{/* Sidebar could go here */}
				<div className={classes.EventsCalendar} onClick={e => e.stopPropagation()}>
					<CircularLoader visible={isFetching} />
					{view === 'month' ? (
						<Month
							hasPopover={hasViewPopover}
							enableDragNDrop={enableDragNDrop}
							compact={compact}
							activeDate={activeDate}
							dispatch={dispatch}
							eventsArray={eventsArray}
							handleMouseEvent={handleMouseEvent}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					) : view === 'week' ? (
						<Week
							hasPopover={hasViewPopover}
							enableDragNDrop={enableDragNDrop}
							compact={compact}
							activeDate={activeDate}
							dispatch={dispatch}
							eventsArray={eventsArray}
							handleMouseEvent={handleMouseEvent}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					) : (
						<Day
							hasPopover={hasViewPopover}
							enableDragNDrop={enableDragNDrop}
							compact={compact}
							activeDate={activeDate}
							dispatch={dispatch}
							eventsArray={eventsArray}
							handleMouseEvent={handleMouseEvent}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					)}
					{hasPopover && (
						<Popover isOpen={popoverIsOpen} anchor={state.eventAnchor} dispatch={dispatch} zIndex={501}>
							{state.popoverDisplayType === 'view' && renderViewPopover
								? renderViewPopover({ onClose, setPopoverType, event: state.clickedEvent })
								: state.popoverDisplayType === 'edit' && renderEditPopover
								? renderEditPopover({ onClose, setPopoverType, event: state.clickedEvent })
								: state.popoverDisplayType === 'create' && renderCreatePopover
								? renderCreatePopover({ onClose, setPopoverType, event: state.placeholderEvent })
								: state.popoverDisplayType === 'drag-update' && renderEditPopover
								? renderEditPopover({ onClose, setPopoverType, event: state.placeholderEvent })
								: null}
						</Popover>
					)}
					<OverflowCard
						hasPopover={hasViewPopover}
						compact={compact}
						dispatch={dispatch}
						events={view === 'week' ? eventsArray.filter(event => event.isAllDay) : eventsArray}
						placeholderRef={placeholderRef}
						renderContextMenu={renderContextMenu}
						state={state}
						enableDragNDrop={enableDragNDrop}
					/>
				</div>
			</div>
		</div>
	);
}
