import { Dayjs } from 'dayjs';
import { Dispatch, RefObject } from 'react';
import classes from './TimeBackground.module.css';

import { updateEvent } from '~/utils';
import { MouseEventHandler, CalendarAction, CalendarState, EventEditProps } from '~/types';

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

interface TimeBackgroundProps {
	view: 'day' | 'week';
	activeDate: Dayjs;
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	state: CalendarState;
	dispatch: Dispatch<CalendarAction>;
	onEventReschedule?: (props: EventEditProps) => void;
}

export function TimeBackground({
	view,
	activeDate,
	handleMouseEvent,
	placeholderRef,
	state,
	dispatch,
	onEventReschedule,
}: TimeBackgroundProps) {
	// Build grid arrays
	const daysArray = view === 'day' ? [0] : buildIndexArr(7);
	const hoursArray = buildIndexArr(24);
	const timeBlocksArray = buildIndexArr(4);

	// Popover handler
	const openPopover = () => dispatch({ type: 'open_popover' });

	return (
		<>
			{daysArray.map(day =>
				hoursArray.map(hour =>
					timeBlocksArray.map(timeBlock => {
						const date = getActiveDateTime(activeDate, day, hour, timeBlock);
						return (
							<div
								className={classes.gridCell}
								data-isweekview={view === 'week'}
								key={`${day}${hour}${timeBlock}`}
								onMouseDown={e => handleMouseEvent(e, date, true, placeholderRef)}
								onMouseEnter={e => {
									if (state.eventDragActive) updateEvent({ state, dispatch, date, view });
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
