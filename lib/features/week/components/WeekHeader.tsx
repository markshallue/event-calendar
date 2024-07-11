import { Dispatch, ReactNode, RefObject } from 'react';
import classes from './Week.module.css';

import {
	DateRecord,
	MinMaxDatesInView,
	MouseEventHandler,
	OrderedCalendarEvent,
	CalendarEvent,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
} from '~/types';

import { filterByWeek } from '~/utils/filterByWeek';
import { CellContainer } from '~/components';
import { arrangeWeekEvents } from '~/utils/arrangeWeekEvents';

// Only show a max of two events in week header
const EVENT_LIMIT = 2;

interface WeekHeaderProps {
	enableDragNDrop: boolean;
	hasPopover: boolean;
	compact: boolean;
	allDayEvents: CalendarEvent[];
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	minMaxDatesInView: MinMaxDatesInView;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
	weekDatesArray: DateRecord[];
}

export function WeekHeader({
	enableDragNDrop,
	hasPopover,
	compact,
	allDayEvents,
	dispatch,
	handleMouseEvent,
	minMaxDatesInView,
	placeholderRef,
	renderContextMenu,
	state,
	weekDatesArray,
}: WeekHeaderProps) {
	const orderedEvents = arrangeWeekEvents(filterByWeek(allDayEvents, weekDatesArray[0].date));
	const maxDailyEvents =
		orderedEvents.length > 0 ? Math.max(...orderedEvents.map((x: OrderedCalendarEvent) => x.order + 1)) : 0;

	// Calculate header height
	const cellHeightScalar = maxDailyEvents > EVENT_LIMIT ? EVENT_LIMIT + 1 : maxDailyEvents;
	const headerHeight = (compact ? 20 : 23 * cellHeightScalar) + (cellHeightScalar > 0 ? 8 : 0);

	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'stop_drag_events' });
	};

	return (
		<div className={classes.headerRow} onMouseLeave={handleStopDrag}>
			{weekDatesArray.map((dayRecord, dayIndex) => {
				const { date } = dayRecord;
				return (
					<div className={classes.headerCell} key={dayIndex}>
						<div className={classes.headerLabel} data-today={date.isToday()} onMouseEnter={handleStopDrag}>
							{`${date.format('ddd')} ${date.format('DD')}`}
						</div>
						<CellContainer
							isWeekHeader
							EVENT_LIMIT={EVENT_LIMIT}
							enableDragNDrop={enableDragNDrop}
							hasPopover={hasPopover}
							compact={compact}
							dayRecord={dayRecord}
							dispatch={dispatch}
							handleMouseEvent={handleMouseEvent}
							headerHeight={headerHeight}
							minMaxDatesInView={minMaxDatesInView}
							orderedEvents={orderedEvents}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					</div>
				);
			})}
		</div>
	);
}
