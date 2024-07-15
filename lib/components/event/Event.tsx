import { Dispatch, ReactNode, RefObject, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Event.module.css';

import { getTimeDiff, getTimeLabel } from '~/utils';
import { useCalendarEvent } from '~/hooks';
import {
	CalendarState,
	CalendarAction,
	MinMaxDatesInView,
	OrderedCalendarEvent,
	EventsCalendarContextMenuProps,
	CalendarView,
	EventClickProps,
} from '~/types';

import { TimeEvent } from './TimeEvent';
import { AllDayEvent } from './AllDayEvent';
import { getEventStyles, getWeekOrDayEventStyles, isBeingDragged } from './utils';

interface EventProps {
	view: CalendarView;
	enableRescheduling: boolean;
	compact?: boolean;
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	event: OrderedCalendarEvent;
	isInWeekHeader?: boolean;
	isInOverflow?: boolean;
	isInDayHeader?: boolean;
	minMaxDatesInView?: MinMaxDatesInView;
	onEventClick?: ({ event, isDoubleClick }: EventClickProps) => void;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
}

export function Event({
	view,
	enableRescheduling,
	compact = false,
	date,
	dispatch,
	event,
	isInWeekHeader = false,
	isInOverflow = false,
	isInDayHeader = false,
	minMaxDatesInView,
	onEventClick,
	placeholderRef,
	renderContextMenu,
	state,
}: EventProps) {
	const ref = useRef<HTMLDivElement>(null);
	const hasContextMenu = !!renderContextMenu;
	const isInteractive = !!onEventClick || enableRescheduling;
	const isMonthView = view === 'month';
	const isDayView = view === 'day';

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
		isInOverflow,
	});

	// Current event is placeholder event
	const isPlaceholder = event.id === null;
	const eventRef = isPlaceholder && event.start.isSame(date, 'd') ? placeholderRef : ref;
	const timeDuration = Math.abs(getTimeDiff(event.start, event.end));
	const isShort = timeDuration <= 30;
	const overlapOffset = isDayView ? 120 : 20;
	const dayIndex = isDayView ? 0 : date.day();
	const onClose = () => dispatch({ type: 'reset_calendar' });
	const openPopover = () => dispatch({ type: 'open_popover' });

	const onDragStart = () => {
		dispatch({ type: 'reset_calendar' });
		if (enableRescheduling && !isInOverflow) {
			dispatch({
				type: 'event_reschedule_start',
				event: { ...event, dragId: event.id, order: isMonthView ? event.order : 1000 },
			});
		}
	};

	const wrapperStyles = isMonthView
		? getEventStyles(isInOverflow, event, date, compact, isInWeekHeader, isInDayHeader)
		: getWeekOrDayEventStyles(event, timeDuration, dayIndex, overlapOffset, isInteractive && isActive);

	return (
		<>
			<div
				className={isMonthView ? classes.monthItemContainer : classes.weekItemContainer}
				data-interactive={isInteractive}
				data-active={isInteractive && isActive}
				data-anchorday={date.format('DD-MMM-YYYY')}
				data-placeholder={isPlaceholder}
				data-dragactive={state.dragActive || state.eventDragActive}
				data-isdragging={isBeingDragged(state, event)}
				data-sm={compact}
				data-time={isMonthView && !event.isAllDay}
				draggable='true'
				onClick={e => handleClick(e, isPlaceholder, eventRef, onEventClick)}
				onContextMenu={e => handleContextMenu(e, eventRef)}
				onDragStart={onDragStart}
				ref={eventRef}
				style={wrapperStyles}
			>
				{isMonthView ? (
					!event.isAllDay && event.startTime && event.endTime ? (
						<TimeEvent event={event} isCompact={compact} />
					) : (
						<AllDayEvent
							date={date}
							event={event}
							isCompact={compact}
							isInOverflow={isInOverflow}
							minMaxDatesInView={minMaxDatesInView}
						/>
					)
				) : (
					<div className={classes.itemLabelWrapper} data-short={isShort}>
						<span style={isShort ? undefined : { width: '100%' }}>{event.title}</span>
						<span className={classes.timeText}>{getTimeLabel(event, timeDuration)}</span>
					</div>
				)}
			</div>
			{contextIsOpen && (
				<div ref={refs.setFloating} style={{ ...floatingStyles, zIndex: 500 }} {...getFloatingProps()}>
					{renderContextMenu && renderContextMenu({ event, closeContextMenu, onClose, openPopover })}
				</div>
			)}
		</>
	);
}
