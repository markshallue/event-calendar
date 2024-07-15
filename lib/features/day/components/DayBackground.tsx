import { Dispatch, RefObject } from 'react';
import { Dayjs } from 'dayjs';
import classes from '../Day.module.css';

import { updateEvent } from '~/utils';
import { MouseEventHandler, CalendarAction, CalendarState, EventEditProps } from '~/types';

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
	onEventReschedule?: (props: EventEditProps) => void;
}

export function DayBackground({
	activeDate,
	handleMouseEvent,
	placeholderRef,
	state,
	dispatch,
	onEventReschedule,
}: DayBackgroundProps) {
	// Build grid arrays
	const hoursArray = buildIndexArr(24);
	const timeBlocksArray = buildIndexArr(4);

	// Popover handler
	const openPopover = () => dispatch({ type: 'open_popover' });

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
								if (state.eventDragActive) updateEvent({ state, dispatch, date, view: 'day' });
								handleMouseEvent(e, date, true, placeholderRef);
							}}
							onMouseUp={e => {
								if (state.eventDragActive) {
									dispatch({ type: 'update_event_end', anchor: placeholderRef.current });
									onEventReschedule &&
										onEventReschedule({
											event: state.placeholderEvent,
											eventRef: placeholderRef.current!,
											openPopover,
										});
								}
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
