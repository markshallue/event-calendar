import { Dispatch } from 'react';
import { MouseEventHandler, CalendarAction, CalendarState, EventEditProps } from '~/types';
import { Dayjs } from 'dayjs';

import { getTimeDiff, getPlaceholderEvent, returnValidStartEnd } from '../utils';

interface useMouseEventProps {
	enableDragCreation: boolean;
	dispatch: Dispatch<CalendarAction>;
	state: CalendarState;
	onEventCreate?: (props: EventEditProps) => void;
}

const updatePlaceholder = ({
	isTimeEvent,
	firstClickDate,
	start,
	date,
	dispatch,
}: {
	isTimeEvent: boolean;
	firstClickDate: Dayjs;
	start: Dayjs;
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
}) => {
	if (isTimeEvent) {
		const tempStart =
			getTimeDiff(firstClickDate, date) < 0
				? returnValidStartEnd(start, firstClickDate.add(15, 'minute'))[1]
				: firstClickDate;
		const tempEnd = start.hour(date.hour()).minute(date.minute());
		if (Math.abs(getTimeDiff(tempStart, date)) >= 15) {
			const updatedEvent = getPlaceholderEvent(tempStart, tempEnd, true);
			dispatch({ type: 'update_event', event: updatedEvent });
		}
	} else {
		const updatedEvent = getPlaceholderEvent(firstClickDate, date);
		dispatch({ type: 'update_event', event: updatedEvent });
	}
};

export const useMouseEvent = ({ enableDragCreation, dispatch, state, onEventCreate }: useMouseEventProps) => {
	// If view only calendar, only close popovers on mousedown
	if (!enableDragCreation) {
		return (e: React.MouseEvent) => {
			if (e.type === 'mousedown') dispatch({ type: 'reset_calendar' });
		};
	}

	// Popover handler
	const openPopover = () => dispatch({ type: 'open_popover' });
	const reset = () => dispatch({ type: 'reset_calendar' });

	const mouseEventHandler: MouseEventHandler = (e, date, isTimeEvent, placeholderRef) => {
		const { dragActive, firstClickDate, placeholderEvent } = state;
		const { start } = placeholderEvent;

		// Reset drag event if anything other than left click triggered
		if (e.button !== 0) {
			if (dragActive) dispatch({ type: 'event_create_stop' });
			return;
		}

		switch (e.type) {
			case 'mousedown': {
				if (state.eventAnchor || state.overflowIsOpen) {
					dispatch({ type: 'reset_calendar' });
					return;
				}

				const updatedEvent = getPlaceholderEvent(date, date, isTimeEvent, true);
				dispatch({ type: 'event_create_start', date, event: updatedEvent, anchor: placeholderRef.current });
				break;
			}
			case 'mouseenter': {
				if (e.buttons !== 1 || !dragActive || !firstClickDate) return;
				updatePlaceholder({ isTimeEvent, firstClickDate, start, date, dispatch });
				break;
			}
			case 'mouseup': {
				if (!dragActive) return;

				onEventCreate &&
					onEventCreate({
						clickedEvent: state.clickedEvent,
						newEvent: state.placeholderEvent,
						eventRef: placeholderRef.current!,
						openPopover,
						reset,
					});

				// Delay opening of popup
				setTimeout(() => {
					dispatch({ type: 'event_create_end', anchor: placeholderRef.current });
				}, 10);
			}
		}
	};
	return mouseEventHandler;
};
