import { Dayjs } from 'dayjs';
import { Dispatch, RefObject } from 'react';
import classes from './Week.module.css';

import { eventDragUpdate } from '~/utils';
import { MouseEventHandler, CalendarAction, CalendarState } from '~/types';

// Functions
const buildIndexArr = (l: number) => {
	return Array(l)
		.fill(0)
		.map((_, i) => i);
};
const getActiveDateTime = (activeDate: Dayjs, day: number, hour: number, timeBlock: number) => {
	return activeDate
		.startOf('week')
		.add(day, 'd')
		.hour(hour)
		.minute(timeBlock * 15);
};

interface WeekBackgroundProps {
	activeDate: Dayjs;
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	state: CalendarState;
	dispatch: Dispatch<CalendarAction>;
}

export function WeekBackground({ activeDate, handleMouseEvent, placeholderRef, state, dispatch }: WeekBackgroundProps) {
	// Build grid arrays
	const daysArray = buildIndexArr(7);
	const hoursArray = buildIndexArr(24);
	const timeBlocksArray = buildIndexArr(4);

	return (
		<>
			{daysArray.map(day =>
				hoursArray.map(hour =>
					timeBlocksArray.map(timeBlock => {
						const date = getActiveDateTime(activeDate, day, hour, timeBlock);
						return (
							<div
								className={classes.gridCell}
								key={`${day}${hour}${timeBlock}`}
								onMouseDown={e => handleMouseEvent(e, date, true, placeholderRef)}
								onMouseEnter={e => {
									if (state.eventDragActive) eventDragUpdate({ state, dispatch, date, view: 'week' });
									handleMouseEvent(e, date, true, placeholderRef);
								}}
								onMouseUp={e => {
									if (state.eventDragActive) dispatch({ type: 'event_drag_end', anchor: placeholderRef.current });
									handleMouseEvent(e, date, true, placeholderRef);
								}}
								style={{
									gridColumnStart: day + 1,
									gridRow: `${hour * 4 + timeBlock + 1} / ${hour * 4 + timeBlock + 2}`,
									cursor: state.eventDragActive ? 'grabbing' : 'auto',
								}}
							></div>
						);
					})
				)
			)}
		</>
	);
}
