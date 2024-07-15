import { Dispatch } from 'react';
import { Dayjs } from 'dayjs';

import { CalendarView, CalendarAction, CalendarState } from '~/types';

interface updateDragNDropPlaceholderProps {
	state: CalendarState;
	dispatch: Dispatch<CalendarAction>;
	date: Dayjs;
	view: CalendarView;
}

export function updateEvent({ state, dispatch, date, view }: updateDragNDropPlaceholderProps) {
	const timeScale = view === 'month' ? 'day' : 'minute';

	// After placeholder event is created (for dragging), record where on the event we have clicked (e.g. 2 days/60mins in)
	if (state.dragStartOffset === null) {
		const dateDiff = date.diff(state.clickedEvent.start, timeScale);
		dispatch({ type: 'update_event', dragStartOffset: dateDiff });
		return;
	}

	// Extract existing values
	const { start, end, startTime, endTime } = state.clickedEvent;

	// On drag over grid, update the placeholder event
	const newStart = date.subtract(state.dragStartOffset, timeScale);
	const increment = end.diff(start, timeScale);
	const newEnd = newStart.add(increment, timeScale);

	if (view !== 'month' && !newStart.isSame(newEnd, 'day')) return;

	dispatch({
		type: 'update_event',
		event: {
			...state.placeholderEvent,
			start: view === 'month' ? newStart.hour(start.hour()).minute(start.minute()) : newStart,
			end: view === 'month' ? newEnd.hour(end.hour()).minute(end.minute()) : newEnd,
			startTime: view === 'month' ? startTime : newStart.format('h:mma'),
			endTime: view === 'month' ? endTime : newEnd.format('h:mma'),
		},
	});
}
