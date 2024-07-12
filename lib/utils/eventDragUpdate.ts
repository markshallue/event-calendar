import { Dispatch } from 'react';
import { Dayjs } from 'dayjs';

import { CalendarView, CalendarAction, CalendarState } from '~/types';

interface updateDragNDropPlaceholderProps {
	state: CalendarState;
	dispatch: Dispatch<CalendarAction>;
	date: Dayjs;
	view: CalendarView;
}

export function eventDragUpdate({ state, dispatch, date, view }: updateDragNDropPlaceholderProps) {
	const timeScale = view === 'month' ? 'day' : 'minute';

	// After placeholder event is created (for dragging), record where on the event we have clicked (e.g. 2 days/60mins in)
	if (state.dragStartOffset === null) {
		const dateDiff = date.diff(state.clickedEvent.start, timeScale);
		dispatch({ type: 'mouse_move', dragStartOffset: dateDiff });
		return;
	}

	// On drag over grid, update the placeholder event
	const { start, end, startTime, endTime, isAllDay } = state.clickedEvent;
	const newStart = date.subtract(state.dragStartOffset, timeScale).hour(start.hour()).minute(start.minute());
	const increment = end.diff(start, timeScale);
	const newEnd = newStart.add(increment, timeScale).hour(end.hour()).minute(end.minute());
	const newStartTime = isAllDay ? startTime : newStart.format('h:mma');
	const newEndTime = isAllDay ? endTime : newEnd.format('h:mma');

	if (view !== 'month' && !newStart.isSame(newEnd, 'day')) return;

	dispatch({
		type: 'mouse_move',
		event: {
			...state.placeholderEvent,
			start: newStart,
			end: newEnd,
			startTime: newStartTime,
			endTime: newEndTime,
		},
	});
}
