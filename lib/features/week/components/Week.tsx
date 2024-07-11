import { Dispatch, ReactNode, RefObject, useEffect, useMemo, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Week.module.css';

import { HoursColumn } from '~/components';
import { CalendarAction, CalendarState } from '~/types';
import { CalendarEvent, MouseEventHandler, EventsCalendarContextMenuProps } from '~/types';

import { getWeekDates } from '../utils';

import { WeekHeader } from './WeekHeader';
import { WeekGrid } from './WeekGrid';

interface WeekProps {
	hasPopover: boolean;
	enableDragNDrop: boolean;
	compact: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	eventsArray: CalendarEvent[];
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
}

export function Week({
	hasPopover,
	enableDragNDrop,
	compact,
	activeDate,
	dispatch,
	eventsArray,
	handleMouseEvent,
	placeholderRef,
	renderContextMenu,
	state,
}: WeekProps) {
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
	const weekDates = useMemo(() => getWeekDates(activeDate), [activeDate]);
	const minMaxDatesInView = { first: weekDates[0].date, last: weekDates[6].date };

	return (
		<div className={classes.wrapper}>
			<WeekHeader
				enableDragNDrop={enableDragNDrop}
				hasPopover={hasPopover}
				compact={compact}
				allDayEvents={allDayEvents}
				dispatch={dispatch}
				handleMouseEvent={handleMouseEvent}
				minMaxDatesInView={minMaxDatesInView}
				placeholderRef={placeholderRef}
				renderContextMenu={renderContextMenu}
				state={state}
				weekDatesArray={weekDates}
			/>
			<div ref={viewportRef} className={classes.scrollWrapper}>
				<div className={classes.gridWrapper}>
					<HoursColumn />
					<WeekGrid
						enableDragNDrop={enableDragNDrop}
						hasPopover={hasPopover}
						activeDate={activeDate}
						dispatch={dispatch}
						handleMouseEvent={handleMouseEvent}
						placeholderRef={placeholderRef}
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
