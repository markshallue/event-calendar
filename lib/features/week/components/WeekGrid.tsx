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
} from '~/types';
import { TimeIndicator } from '~/components';
import { arrangeWeekdayEvents } from '~/utils';

import { WeekItem } from './WeekItem';
import { WeekBackground } from './WeekBackground';

interface WeekGridProps {
	enableDragNDrop: boolean;
	hasPopover: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
	timeEvents: CalendarEvent[];
	weekDaysArray: DateRecord[];
}

export function WeekGrid({
	enableDragNDrop,
	hasPopover,
	activeDate,
	dispatch,
	handleMouseEvent,
	placeholderRef,
	renderContextMenu,
	state,
	timeEvents,
	weekDaysArray,
}: WeekGridProps) {
	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'stop_drag_events' });
	};

	return (
		<div className={classes.grid} onMouseEnter={handleStopDrag} onMouseLeave={handleStopDrag}>
			<WeekBackground
				activeDate={activeDate}
				handleMouseEvent={handleMouseEvent}
				placeholderRef={placeholderRef}
				dispatch={dispatch}
				state={state}
			/>

			<TimeIndicator />

			{/* Render events */}
			{weekDaysArray.map((dayRecord, dayIndex) => {
				const { date } = dayRecord;
				const eventsByDate = filterByDate(timeEvents, date);
				const orderedEvents = arrangeWeekdayEvents(eventsByDate, date);
				const sundayOffset = dayIndex === 0 ? 6 : 0;

				const { placeholderEvent } = state;
				const showPlaceholder =
					placeholderEvent.isActive &&
					!placeholderEvent.isAllDay &&
					date.isBetween(placeholderEvent.start, placeholderEvent.end, 'd', '[]');
				if (showPlaceholder) orderedEvents.push(placeholderEvent);

				return orderedEvents.map(event => (
					<WeekItem
						enableDragNDrop={enableDragNDrop}
						hasPopover={hasPopover}
						date={date}
						dayIndex={dayIndex}
						dispatch={dispatch}
						event={event}
						placeholderRef={placeholderRef}
						renderContextMenu={renderContextMenu}
						key={event.id}
						state={state}
						sundayOffset={sundayOffset}
					/>
				));
			})}
		</div>
	);
}
