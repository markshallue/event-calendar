import { Dispatch, ReactNode, RefObject } from 'react';
import classes from './TimeViewHeader.module.css';

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
import { CellContainer } from '~/components';
import { filterByDate, filterByWeek, arrangeWeekEvents } from '~/utils';

// Only show a max of two events in header
const EVENT_LIMIT = 2;

interface TimeViewHeaderProps {
	view: 'day' | 'week';
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

export function TimeViewHeader({
	view,
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
}: TimeViewHeaderProps) {
	const filteredEvents =
		view === 'day'
			? filterByDate(allDayEvents, weekDatesArray[0].date)
			: filterByWeek(allDayEvents, weekDatesArray[0].date);
	const orderedEvents = arrangeWeekEvents(filteredEvents);
	const totalEventsOnThisDate =
		orderedEvents.length > 0 ? Math.max(...orderedEvents.map((x: OrderedCalendarEvent) => x.order + 1)) : 0;

	// Calculate header height
	const numEventsToShow = Math.min(totalEventsOnThisDate, EVENT_LIMIT + 1); // Include space for show more text
	const heightOfEvent = compact ? 20 : 23;
	const bottomPadding = numEventsToShow > 0 ? 8 : 0;
	const headerHeight = heightOfEvent * numEventsToShow + bottomPadding;

	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'event_create_stop' });
	};

	return (
		<div className={classes.headerRow} data-isweekview={view === 'week'} onMouseLeave={handleStopDrag}>
			{weekDatesArray.map((dayRecord, dayIndex) => {
				const { date } = dayRecord;
				return (
					<div className={classes.headerCell} key={dayIndex}>
						{view === 'week' && (
							<div className={classes.headerLabel} data-today={date.isToday()} onMouseEnter={handleStopDrag}>
								{`${date.format('ddd')} ${date.format('DD')}`}
							</div>
						)}
						<CellContainer
							isInDayHeader={view === 'day'}
							isInWeekHeader={view === 'week'}
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
