import { Dispatch, ReactNode, RefObject, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './DayItem.module.css';

import { splitColourCSS } from '~/utils/functions';
import { getTimeLabel, getTimeDiff } from '~/utils';
import { useCalendarEvent, useLongPress } from '~/hooks';
import { CalendarAction, CalendarState } from '~/types';
import { CalendarTimeEvent, EventsCalendarContextMenuProps } from '~/types';

const OVERLAP_MARGIN = 120;
const getStyles = (event: CalendarTimeEvent, timeDuration: number, isActive: boolean) => {
	const colors = event.groups?.map(g => g.color).filter(Boolean) || [];
	if (colors.length === 0) colors.push('#12B886');

	return {
		gridColumn: 1,
		gridRowStart: event.start && event.start.hour() * 4 + Math.round(event.start.minute() / 15) + 1,
		gridRowEnd: event.end && event.end.hour() * 4 + Math.round(event.end.minute() / 15) + 1,
		height: 12 * ((timeDuration || 60) / 15) - 1,
		backgroundColor: colors[0],
		backgroundImage: splitColourCSS(colors),
		borderWidth: event.indent > 0 ? (timeDuration > 30 ? '1px' : '0.5px') : 0,
		marginLeft: OVERLAP_MARGIN * event.indent + 6,
		width: `calc(100% - ${OVERLAP_MARGIN * (event.indent + 1) + 6}px)`,
		zIndex: isActive ? 299 : 201 + event.order,
	};
};

interface DayItemProps {
	enableDragNDrop: boolean;
	hasPopover: boolean;
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	event: CalendarTimeEvent;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
}

export function DayItem({
	enableDragNDrop,
	hasPopover,
	date,
	dispatch,
	event,
	placeholderRef,
	renderContextMenu,
	state,
}: DayItemProps) {
	const ref = useRef<HTMLDivElement>(null);
	const hasContextMenu = !!renderContextMenu;

	// Main event hook
	const {
		handleClick,
		handleContextMenu,
		isActive,
		contextIsOpen,
		refs,
		floatingStyles,
		getFloatingProps,
		closeContextMenu,
	} = useCalendarEvent({
		dispatch,
		event,
		state,
		hasContextMenu,
	});

	// Current event is placeholder event
	const isPlaceholder = event.id === 0;
	const eventRef = isPlaceholder ? placeholderRef : ref;
	const timeDuration = Math.abs(getTimeDiff(event.start, event.end));
	const isShort = timeDuration <= 30;
	const onClose = () => dispatch({ type: 'reset_to_default' });
	const setPopoverType = (type: 'view' | 'edit') => {
		if (type === 'view') {
			dispatch({ type: 'view_calendar_event' });
		} else {
			dispatch({ type: 'edit_calendar_event' });
		}
	};

	const onLongPress = () => {
		if (enableDragNDrop) dispatch({ type: 'event_drag_start', event: { ...event, dragId: event.id, order: 1000 } });
	};
	const longPressEvent = useLongPress({ onLongPress });

	return (
		<>
			<div
				className={`${classes.itemContainer}`}
				data-interactive={hasPopover}
				data-active={hasPopover && isActive}
				data-anchorday={date.format('DD-MMM-YYYY')}
				data-dragactive={state.dragActive || state.eventDragActive}
				data-isdragging={
					// Hide event when it is being dragged
					(state.eventDragActive && event.id === state.placeholderEvent.dragId) ||
					// Also hide while confirmation popup is visible after drag
					(event.id === state.placeholderEvent.dragId && state.popoverDisplayType === 'drag-update')
				}
				data-id={event.id}
				data-placeholder={isPlaceholder}
				key={event.id}
				onClick={e => handleClick(e, isPlaceholder, eventRef)}
				onContextMenu={e => handleContextMenu(e, eventRef)}
				ref={eventRef}
				style={getStyles(event, timeDuration, hasPopover && isActive)}
				{...longPressEvent}
			>
				<div className={classes.itemLabelWrapper} data-short={isShort}>
					<span style={isShort ? undefined : { width: '100%' }}>{event.title}</span>
					{<span className={classes.timeText}>{getTimeLabel(event, timeDuration)}</span>}
				</div>
			</div>
			{contextIsOpen && (
				<div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 500 }} {...getFloatingProps()}>
					{renderContextMenu && renderContextMenu({ event, closeContextMenu, onClose, setPopoverType })}
				</div>
			)}
		</>
	);
}
