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

import { getWeekDates } from './utils';
import { TimeViewHeader, TimeViewGrid, HoursColumn } from './components';

interface TimeViewProps {
	view: 'day' | 'week';
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

export function TimeView({
	view,
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
}: TimeViewProps) {
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
	const weekDates = useMemo(() => getWeekDates(activeDate, view), [activeDate, view]);
	const minMaxDatesInView = {
		first: view === 'day' ? activeDate : weekDates[0].date,
		last: view === 'day' ? activeDate : weekDates[6].date,
	};

	return (
		<div className={classes.timeView}>
			<TimeViewHeader
				view={view}
				enableRescheduling={enableRescheduling}
				compact={compact}
				allDayEvents={allDayEvents}
				dispatch={dispatch}
				handleMouseEvent={handleMouseEvent}
				minMaxDatesInView={minMaxDatesInView}
				placeholderRef={placeholderRef}
				onEventClick={onEventClick}
				onEventReschedule={onEventReschedule}
				renderContextMenu={renderContextMenu}
				state={state}
				weekDatesArray={weekDates}
			/>
			<div ref={viewportRef} className={classes.scrollWrapper}>
				<div className={classes.gridWrapper}>
					<HoursColumn />

					<TimeViewGrid
						view={view}
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
