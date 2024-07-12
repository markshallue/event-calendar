import { Dispatch, ReactNode, RefObject } from 'react';
import { Dayjs } from 'dayjs';
import classes from './EventCell.module.css';

import { Event } from '~/components';
import {
	OrderedCalendarEvent,
	DateRecord,
	MinMaxDatesInView,
	MouseEventHandler,
	EventsCalendarContextMenuProps,
	CalendarAction,
	CalendarState,
	PlaceholderEvent,
} from '~/types';

import { filterByDate, getVisibleEvents } from '~/utils/functions';

import { CellHeader } from './CellHeader';
import { ShowMoreText } from './ShowMoreText';
import { eventDragUpdate } from '~/utils';

interface CellContainerProps {
	EVENT_LIMIT: number;
	hasPopover: boolean;
	enableDragNDrop: boolean;
	compact: boolean;
	dayRecord: DateRecord;
	dispatch: Dispatch<CalendarAction>;
	handleMouseEvent: MouseEventHandler;
	headerHeight?: number | string;
	isInWeekHeader?: boolean;
	isInDayHeader?: boolean;
	minMaxDatesInView: MinMaxDatesInView;
	orderedEvents: OrderedCalendarEvent[];
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
}

const getPlaceholderActiveState = (placeholderEvent: PlaceholderEvent, date: Dayjs, isInHeader: boolean = false) => {
	const { isActive, isAllDay, start, end } = placeholderEvent;
	return (
		isActive &&
		(!isInHeader || isAllDay) &&
		date.isBetween(start, end, 'd', '[]') &&
		(date.day() === 0 || date.isSame(start, 'day'))
	);
};

export function CellContainer({
	EVENT_LIMIT,
	hasPopover,
	enableDragNDrop,
	compact,
	dayRecord,
	dispatch,
	handleMouseEvent,
	headerHeight = '100%', // Explicit cell height for week header
	isInWeekHeader = false,
	isInDayHeader = false,
	minMaxDatesInView,
	orderedEvents,
	placeholderRef,
	renderContextMenu,
	state,
}: CellContainerProps) {
	const { date } = dayRecord;

	// Calculate visible events within this cell
	const eventsByDate = filterByDate(orderedEvents, date) as OrderedCalendarEvent[];
	const numOverflowEvents = eventsByDate.reduce((a, c) => a + (c.order >= EVENT_LIMIT ? 1 : 0), 0);
	const visibleEvents = getVisibleEvents(eventsByDate, date, EVENT_LIMIT, isInDayHeader);

	// Calculated boolean values
	const showOverflowButton = (isInDayHeader || isInWeekHeader) && numOverflowEvents > 0;
	const showPlaceholder = getPlaceholderActiveState(state.placeholderEvent, date, isInWeekHeader || isInDayHeader);
	if (showPlaceholder) visibleEvents.push(state.placeholderEvent);

	return (
		<>
			<div
				className={classes.cell}
				data-border={date.day() !== 6}
				onMouseDown={e => handleMouseEvent(e, date, false, placeholderRef)}
				onMouseEnter={e => {
					if (state.eventDragActive) eventDragUpdate({ state, dispatch, date, view: 'month' });
					handleMouseEvent(e, date, false, placeholderRef);
				}}
				onMouseUp={e => {
					if (state.eventDragActive) dispatch({ type: 'event_drag_end', anchor: placeholderRef.current });
					handleMouseEvent(e, date, false, placeholderRef);
				}}
				style={{ height: headerHeight, cursor: state.eventDragActive ? 'grabbing' : 'auto' }}
			>
				{/*  If month view, list cell header and overflow text */}
				{!isInWeekHeader && !isInDayHeader && (
					<CellHeader
						dayRecord={dayRecord}
						dispatch={dispatch}
						isCompact={compact}
						numOverflowEvents={numOverflowEvents}
						state={state}
					/>
				)}
				<div className={classes.cellContent} data-week={isInWeekHeader || isInDayHeader}>
					{showOverflowButton && (
						<ShowMoreText
							date={date}
							dispatch={dispatch}
							isCompact={compact}
							numOverflowEvents={numOverflowEvents}
							state={state}
						/>
					)}
				</div>
			</div>
			{/* Render events (which may span multiple cells) */}
			{visibleEvents.map(event => (
				<Event
					key={event.id}
					view='month'
					enableDragNDrop={enableDragNDrop}
					hasPopover={hasPopover}
					compact={compact}
					date={date}
					dispatch={dispatch}
					event={event}
					isInWeekHeader={isInWeekHeader}
					isInDayHeader={isInDayHeader}
					minMaxDatesInView={minMaxDatesInView}
					placeholderRef={placeholderRef}
					renderContextMenu={renderContextMenu}
					state={state}
				/>
			))}
		</>
	);
}
