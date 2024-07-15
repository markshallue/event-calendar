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
			dispatch({ type: 'mouse_move', event: updatedEvent });
		}
	} else {
		const updatedEvent = getPlaceholderEvent(firstClickDate, date);
		dispatch({ type: 'mouse_move', event: updatedEvent });
	}
};

export const useMouseEvent = ({ enableDragCreation, dispatch, state, onEventCreate }: useMouseEventProps) => {
	// If view only calendar, only close popovers on mousedown
	if (!enableDragCreation)
		return (e: React.MouseEvent) => {
			if (e.type === 'mousedown') {
				dispatch({ type: 'reset_to_default' });
				return;
			}
		};

	// Popover handler
	const openPopover = () => dispatch({ type: 'open_popover' });

	const mouseEventHandler: MouseEventHandler = (e, date, isTimeEvent, placeholderRef) => {
		const { dragActive, firstClickDate, placeholderEvent } = state;
		const { start } = placeholderEvent;

		// Reset drag event if anything other than left click triggered
		if (e.button !== 0) {
			if (dragActive) dispatch({ type: 'stop_drag_events' });
			return;
		}

		switch (e.type) {
			case 'mousedown': {
				if (state.eventAnchor || state.overflowIsOpen) {
					dispatch({ type: 'reset_to_default' });
					return;
				}

				const updatedEvent = getPlaceholderEvent(date, date, isTimeEvent, true);
				dispatch({ type: 'mouse_down', date: date, event: updatedEvent });
				break;
			}
			case 'mouseenter': {
				if (e.buttons !== 1 || !dragActive || !firstClickDate) return;
				updatePlaceholder({ isTimeEvent, firstClickDate, start, date, dispatch });
				break;
			}
			case 'mouseup': {
				if (!dragActive) return;

				onEventCreate && onEventCreate({ event: state.placeholderEvent, eventRef: placeholderRef.current!, openPopover });

				// Delay opening of popup
				setTimeout(() => {
					dispatch({ type: 'mouse_up', anchor: placeholderRef.current });
				}, 10);
			}
		}
	};
	return mouseEventHandler;
};
