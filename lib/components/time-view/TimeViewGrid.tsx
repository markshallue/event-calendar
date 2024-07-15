import { Dispatch, ReactNode, RefObject } from 'react';
import { Dayjs } from 'dayjs';
import classes from './TimeViewGrid.module.css';

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

interface TimeViewGridProps {
	view: 'day' | 'week';
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

export function TimeViewGrid({
	view,
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
}: TimeViewGridProps) {
	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'event_create_stop' });
	};

	return (
		<div
			className={classes.grid}
			data-isweekview={view === 'week'}
			onMouseEnter={handleStopDrag}
			onMouseLeave={handleStopDrag}
		>
			<TimeBackground
				view={view}
				activeDate={activeDate}
				handleMouseEvent={handleMouseEvent}
				onEventReschedule={onEventReschedule}
				placeholderRef={placeholderRef}
				dispatch={dispatch}
				state={state}
			/>

			<TimeIndicator activeDate={activeDate} isDayView={view === 'day'} />

			{/* Render events */}
			{weekDaysArray.map(dayRecord => {
				const { date } = dayRecord;
				const eventsByDate = filterByDate(timeEvents, date);
				const orderedEvents = arrangeWeekdayEvents(eventsByDate, date);

				const { placeholderEvent } = state;
				const showPlaceholder =
					placeholderEvent.isActive &&
					!placeholderEvent.isAllDay &&
					activeDate.isBetween(placeholderEvent.start, placeholderEvent.end, 'd', '[]');
				if (showPlaceholder) orderedEvents.push(placeholderEvent);

				return orderedEvents.map(event => (
					<Event
						view={view}
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
