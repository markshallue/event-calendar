import { Dispatch, ReactNode, RefObject, useEffect, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Day.module.css';

import { HoursColumn } from '~/components';
import {
	CalendarEvent,
	EventsCalendarContextMenuProps,
	MouseEventHandler,
	CalendarAction,
	CalendarState,
	EventClickProps,
	EventEditProps,
} from '~/types';

import { DayHeader } from './components';
import { TimeViewGrid } from '~/components/time-view/TimeViewGrid';

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
	compact,
	dispatch,
	enableRescheduling,
	eventsArray,
	handleMouseEvent,
	onEventClick,
	onEventReschedule,
	placeholderRef,
	renderContextMenu,
	state,
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

	// Get week days
	const weekDates = [{ date: activeDate }];

	return (
		<div className={classes.wrapper}>
			<DayHeader
				enableRescheduling={enableRescheduling}
				compact={compact}
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

					<TimeViewGrid
						view='day'
						enableRescheduling={enableRescheduling}
						activeDate={activeDate}
						dispatch={dispatch}
						handleMouseEvent={handleMouseEvent}
						placeholderRef={placeholderRef}
						onEventClick={onEventClick}
						onEventReschedule={onEventReschedule}
						renderContextMenu={renderContextMenu}
						state={state}
						timeEvents={timeEvents}
						weekDaysArray={weekDates}
					/>
				</div>
			</div>
		</div>
	);
}
