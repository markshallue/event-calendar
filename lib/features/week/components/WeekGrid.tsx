import { Dispatch, ReactNode, RefObject } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Week.module.css';

import { filterByDate } from '~/utils/functions';
import {
	CalendarEvent,
	DateRecord,
	MouseEventHandler,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
	EventClickProps,
	EventEditProps,
} from '~/types';
import { TimeIndicator, Event, TimeBackground } from '~/components';
import { arrangeWeekdayEvents } from '~/utils';

interface WeekGridProps {
	enableRescheduling: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	onEventClick?: (props: EventClickProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
	timeEvents: CalendarEvent[];
	weekDaysArray: DateRecord[];
}

export function WeekGrid({
	enableRescheduling,
	activeDate,
	dispatch,
	handleMouseEvent,
	onEventClick,
	onEventReschedule,
	placeholderRef,
	renderContextMenu,
	state,
	timeEvents,
	weekDaysArray,
}: WeekGridProps) {
	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'event_create_stop' });
	};

	return (
		<div className={classes.grid} onMouseEnter={handleStopDrag} onMouseLeave={handleStopDrag}>
			<TimeBackground
				view='week'
				activeDate={activeDate}
				handleMouseEvent={handleMouseEvent}
				onEventReschedule={onEventReschedule}
				placeholderRef={placeholderRef}
				dispatch={dispatch}
				state={state}
			/>

			<TimeIndicator />

			{/* Render events */}
			{weekDaysArray.map(dayRecord => {
				const { date } = dayRecord;
				const eventsByDate = filterByDate(timeEvents, date);
				const orderedEvents = arrangeWeekdayEvents(eventsByDate, date);

				const { placeholderEvent } = state;
				const showPlaceholder =
					placeholderEvent.isActive &&
					!placeholderEvent.isAllDay &&
					date.isBetween(placeholderEvent.start, placeholderEvent.end, 'd', '[]');
				if (showPlaceholder) orderedEvents.push(placeholderEvent);

				return orderedEvents.map(event => (
					<Event
						view='week'
						enableRescheduling={enableRescheduling}
						date={date}
						dispatch={dispatch}
						event={event}
						onEventClick={onEventClick}
						placeholderRef={placeholderRef}
						renderContextMenu={renderContextMenu}
						key={event.id}
						state={state}
					/>
				));
			})}
		</div>
	);
}
