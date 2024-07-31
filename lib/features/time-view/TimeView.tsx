import { Dispatch, ReactNode, RefObject, useEffect, useMemo, useRef } from 'react';
import { Dayjs } from 'dayjs';

import classes from './TimeView.module.css';

import {
	CalendarAction,
	CalendarState,
	EventClickProps,
	EventEditProps,
	CalendarEvent,
	MouseEventHandler,
	EventsCalendarContextMenuProps,
} from '~/types';
import { Event } from '~/components';
import { arrangeWeekdayEvents, filterByDate, isBetween } from '~/utils';

import { getWeekDates } from './utils';
import { TimeViewHeader, HoursColumn, TimeBackground, TimeIndicator } from './components';

interface TimeViewProps {
	view: 'day' | 'week';
	enableRescheduling: boolean;
	compact: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	eventsArray: CalendarEvent[];
	handleMouseEvent: MouseEventHandler;
	handleStopDrag: () => void;
	placeholderRef: RefObject<HTMLDivElement>;
	onEventClick?: (props: EventClickProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
}

export function TimeView({
	view,
	activeDate,
	compact,
	dispatch,
	enableRescheduling,
	eventsArray,
	handleMouseEvent,
	handleStopDrag,
	onEventClick,
	onEventReschedule,
	placeholderRef,
	renderContextMenu,
	state,
}: TimeViewProps) {
	// Constants
	const isDayView = view === 'day';
	const isWeekView = view === 'week';

	// Split events into all day / timed
	const allDayEvents = eventsArray.filter(event => event.isAllDay);
	const timeEvents = eventsArray.filter(event => !event.isAllDay);

	// Scroll to 8am
	const viewportRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const offset8am = 372;
		viewportRef.current!.scrollTo({ top: offset8am });
	}, [activeDate]);

	// Get week days
	const weekDatesArray = useMemo(() => getWeekDates(activeDate, view), [activeDate, view]);
	const minMaxDatesInView = {
		first: isDayView ? activeDate : weekDatesArray[0].date,
		last: isDayView ? activeDate : weekDatesArray[6].date,
	};

	return (
		<div className={classes.timeView}>
			<TimeViewHeader
				allDayEvents={allDayEvents}
				compact={compact}
				dispatch={dispatch}
				enableRescheduling={enableRescheduling}
				handleMouseEvent={handleMouseEvent}
				handleStopDrag={handleStopDrag}
				minMaxDatesInView={minMaxDatesInView}
				onEventClick={onEventClick}
				onEventReschedule={onEventReschedule}
				placeholderRef={placeholderRef}
				renderContextMenu={renderContextMenu}
				state={state}
				view={view}
				weekDatesArray={weekDatesArray}
			/>
			<div ref={viewportRef} className={classes.scrollWrapper}>
				<div className={classes.gridWrapper}>
					<HoursColumn />

					<div
						className={classes.grid}
						data-isweekview={isWeekView}
						onMouseEnter={handleStopDrag}
						onMouseLeave={handleStopDrag}
					>
						<TimeBackground
							activeDate={activeDate}
							dispatch={dispatch}
							handleMouseEvent={handleMouseEvent}
							onEventReschedule={onEventReschedule}
							placeholderRef={placeholderRef}
							state={state}
							view={view}
						/>

						<TimeIndicator activeDate={activeDate} isDayView={isDayView} />

						{/* Render events */}
						{weekDatesArray.map(dayRecord => {
							const { date } = dayRecord;
							const eventsByDate = filterByDate(timeEvents, date);
							const orderedEvents = arrangeWeekdayEvents(eventsByDate, date);

							// Add placeholder event to events when required
							const { isActive, isAllDay, start, end } = state.placeholderEvent;
							const showPlaceholder = isActive && !isAllDay && isBetween(date, start, end);
							if (showPlaceholder) orderedEvents.push(state.placeholderEvent);

							return orderedEvents.map(event => (
								<Event
									date={date}
									dispatch={dispatch}
									enableRescheduling={enableRescheduling}
									event={event}
									key={event.id}
									onEventClick={onEventClick}
									placeholderRef={placeholderRef}
									renderContextMenu={renderContextMenu}
									state={state}
									view={view}
								/>
							));
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
