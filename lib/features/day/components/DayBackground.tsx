import { Dispatch, RefObject } from 'react';
import { Dayjs } from 'dayjs';
import classes from '../Day.module.css';

import { eventDragUpdate } from '~/utils';
import { MouseEventHandler, CalendarAction, CalendarState } from '~/types';

// Functions
const buildIndexArr = (l: number) => {
	return Array(l)
		.fill(0)
		.map((_, i) => i);
};
const getActiveDateTime = (activeDate: Dayjs, hour: number, timeBlock: number) => {
	return activeDate
		.startOf('day')
		.hour(hour)
		.minute(timeBlock * 15);
};

interface DayBackgroundProps {
	activeDate: Dayjs;
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	state: CalendarState;
	dispatch: Dispatch<CalendarAction>;
}

export function DayBackground({ activeDate, handleMouseEvent, placeholderRef, state, dispatch }: DayBackgroundProps) {
	// Build grid arrays
	const hoursArray = buildIndexArr(24);
	const timeBlocksArray = buildIndexArr(4);

	return (
		<>
			{hoursArray.map(hour =>
				timeBlocksArray.map(timeBlock => {
					const date = getActiveDateTime(activeDate, hour, timeBlock);
					return (
						<div
							className={classes.gridCell}
							key={`${hour}${timeBlock}`}
							onMouseDown={e => handleMouseEvent(e, date, true, placeholderRef)}
							onMouseEnter={e => {
								if (state.eventDragActive) eventDragUpdate({ state, dispatch, date, view: 'day' });
								handleMouseEvent(e, date, true, placeholderRef);
							}}
							onMouseUp={e => {
								if (state.eventDragActive) dispatch({ type: 'event_drag_end', anchor: placeholderRef.current });
								handleMouseEvent(e, date, true, placeholderRef);
							}}
							style={{
								gridColumnStart: 1,
								gridRow: `${hour * 4 + timeBlock + 1} / ${hour * 4 + timeBlock + 2}`,
								cursor: state.eventDragActive ? 'grabbing' : 'auto',
							}}
						></div>
					);
				})
			)}
		</>
	);
}
