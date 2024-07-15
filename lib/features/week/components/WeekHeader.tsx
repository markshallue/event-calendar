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
	EventClickProps,
	EventEditProps,
} from '~/types';

import { filterByWeek } from '~/utils/filterByWeek';
import { CellContainer } from '~/components';
import { arrangeWeekEvents } from '~/utils/arrangeWeekEvents';

// Only show a max of two events in week header
const EVENT_LIMIT = 2;

interface WeekHeaderProps {
	enableRescheduling: boolean;
	compact: boolean;
	allDayEvents: CalendarEvent[];
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	minMaxDatesInView: MinMaxDatesInView;
	placeholderRef: RefObject<HTMLDivElement>;
	onEventClick?: (props: EventClickProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
	weekDatesArray: DateRecord[];
}

export function WeekHeader({
	enableRescheduling,
	compact,
	allDayEvents,
	dispatch,
	handleMouseEvent,
	minMaxDatesInView,
	onEventClick,
	onEventReschedule,
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
							isInWeekHeader
							EVENT_LIMIT={EVENT_LIMIT}
							enableRescheduling={enableRescheduling}
							compact={compact}
							dayRecord={dayRecord}
							dispatch={dispatch}
							handleMouseEvent={handleMouseEvent}
							headerHeight={headerHeight}
							minMaxDatesInView={minMaxDatesInView}
							onEventClick={onEventClick}
							onEventReschedule={onEventReschedule}
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
