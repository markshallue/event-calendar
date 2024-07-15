import { Dispatch, ReactNode, RefObject, useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Day.module.css';

import { filterByDate, arrangeWeekdayEvents } from '~/utils';
import { HoursColumn, TimeIndicator, Event } from '~/components';
import {
	CalendarEvent,
	EventsCalendarContextMenuProps,
	MouseEventHandler,
	CalendarAction,
	CalendarState,
	EventClickProps,
	EventEditProps,
} from '~/types';

import { DayBackground, DayHeader } from './components';

interface DayProps {
	enableRescheduling: boolean;
	compact: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	eventsArray: CalendarEvent[];
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	onEventClick?: (props: EventClickProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
}

export function Day({
	activeDate,
	enableRescheduling,
	renderContextMenu,
	handleMouseEvent,
	eventsArray,
	state,
	dispatch,
	onEventClick,
	placeholderRef,
}: DayProps) {
	// Split events into all day / timed
	const allDayEvents = eventsArray.filter(event => event.isAllDay);
	const timeEvents = eventsArray.filter(event => !event.isAllDay);

	// Scroll to 8am
	const viewportRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const offset8am = 372;
		viewportRef.current!.scrollTo({ top: offset8am });
	}, [activeDate]);

	const eventsByDate = filterByDate(timeEvents, activeDate);
	const orderedEvents = arrangeWeekdayEvents(eventsByDate, activeDate);

	const { placeholderEvent } = state;
	const showPlaceholder =
		placeholderEvent.isActive &&
		!placeholderEvent.isAllDay &&
		activeDate.isBetween(placeholderEvent.start, placeholderEvent.end, 'd', '[]');
	if (showPlaceholder) orderedEvents.push(placeholderEvent);

	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'stop_drag_events' });
	};

	return (
		<div className={classes.wrapper}>
			<DayHeader
				enableRescheduling={enableRescheduling}
				compact={false} // TODO
				allDayEvents={allDayEvents}
				dispatch={dispatch}
				handleMouseEvent={handleMouseEvent}
				minMaxDatesInView={{ first: activeDate, last: activeDate }}
				placeholderRef={placeholderRef}
				renderContextMenu={renderContextMenu}
				state={state}
				date={activeDate}
			/>
			<div ref={viewportRef} className={classes.scrollWrapper}>
				<div className={classes.gridWrapper}>
					<HoursColumn />

					<div className={classes.grid} onMouseEnter={handleStopDrag} onMouseLeave={handleStopDrag}>
						<DayBackground
							activeDate={activeDate}
							handleMouseEvent={handleMouseEvent}
							placeholderRef={placeholderRef}
							state={state}
							dispatch={dispatch}
						/>

						{activeDate.isSame(new Date(), 'day') && <TimeIndicator isDayView />}

						{/* Render events */}
						{orderedEvents.map(event => (
							<Event
								view='day'
								enableRescheduling={enableRescheduling}
								date={activeDate}
								dispatch={dispatch}
								event={event}
								onEventClick={onEventClick}
								placeholderRef={placeholderRef}
								renderContextMenu={renderContextMenu}
								key={event.id}
								state={state}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
