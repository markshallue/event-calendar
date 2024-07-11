import { Dispatch, ReactNode, RefObject, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './EventCell.module.css';

import {
	OrderedCalendarEvent,
	MinMaxDatesInView,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
} from '~/types';
import { useLongPress, useCalendarEvent } from '~/hooks';

import { TimeEvent } from './TimeEvent';
import { AllDayEvent } from './AllDayEvent';
import { getEventWrapperStyles } from './utils';

interface CellItemProps {
	hasPopover: boolean;
	enableDragNDrop: boolean;
	compact: boolean;
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	event: OrderedCalendarEvent;
	isInPopover: boolean;
	isWeekHeader?: boolean;
	isDayHeader?: boolean;
	minMaxDatesInView?: MinMaxDatesInView;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
}

export function CellItem({
	hasPopover,
	enableDragNDrop,
	compact,
	date,
	dispatch,
	event,
	isInPopover,
	isWeekHeader = false,
	isDayHeader = false,
	minMaxDatesInView,
	placeholderRef,
	renderContextMenu,
	state,
}: CellItemProps) {
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
		hasContextMenu,
		isInPopover,
		state,
	});

	// Current event is placeholder event
	const isPlaceholder = event.id === 0;
	const eventRef = isPlaceholder && event.start.isSame(date, 'd') ? placeholderRef : ref;
	const onClose = () => dispatch({ type: 'reset_to_default' });
	const setPopoverType = (type: 'view' | 'edit') => {
		if (type === 'view') {
			dispatch({ type: 'view_calendar_event' });
		} else {
			dispatch({ type: 'edit_calendar_event' });
		}
	};

	const onLongPress = () => {
		if (enableDragNDrop) dispatch({ type: 'event_drag_start', event: { ...event, dragId: event.id } });
	};
	const longPressEvent = useLongPress({ onLongPress });

	return (
		<>
			<div
				className={`cell-item ${classes.itemContainer}`}
				data-interactive={hasPopover}
				data-active={hasPopover && isActive}
				data-anchorday={date.format('DD-MMM-YYYY')}
				data-placeholder={isPlaceholder}
				data-dragactive={state.dragActive || state.eventDragActive}
				data-isdragging={state.eventDragActive && (event.id === 0 || event.id === state.placeholderEvent.dragId)}
				data-sm={compact}
				data-time={!event.isAllDay}
				onClick={e => handleClick(e, isPlaceholder, eventRef)}
				onContextMenu={e => handleContextMenu(e, eventRef)}
				ref={eventRef}
				style={getEventWrapperStyles(isInPopover, event, date, compact, isWeekHeader, isDayHeader)}
				{...longPressEvent}
			>
				{!event.isAllDay && event.startTime && event.endTime ? (
					<TimeEvent event={event} isCompact={compact} />
				) : (
					<AllDayEvent
						date={date}
						event={event}
						isCompact={compact}
						isInPopover={isInPopover}
						minMaxDatesInView={minMaxDatesInView}
					/>
				)}
			</div>
			{contextIsOpen && (
				<div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 500 }} {...getFloatingProps()}>
					{renderContextMenu &&
						renderContextMenu({
							event,
							closeContextMenu,
							onClose,
							setPopoverType,
						})}
				</div>
			)}
		</>
	);
}
