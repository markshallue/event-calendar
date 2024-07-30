import { Dispatch, ReactNode, RefObject } from 'react';
import dayjs from 'dayjs';
import classes from './OverflowCard.module.css';

import { arrangeWeekEvents, filterByDate } from '~/utils';
import { EventsCalendarPopover, Event } from '~/components';
import { CalendarEvent, EventsCalendarContextMenuProps, CalendarAction, CalendarState, EventClickProps } from '~/types';

interface OverflowCardProps {
	compact: boolean;
	dispatch: Dispatch<CalendarAction>;
	events: CalendarEvent[];
	onEventClick?: ({ event, isDoubleClick }: EventClickProps) => void;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	state: CalendarState;
	enableRescheduling: boolean;
}

/* 
    Create dayjs date object if string is defined
*/
const tryDate = (dateString?: string) => (dateString ? dayjs(dateString) : undefined);

export function OverflowCard({
	compact,
	dispatch,
	events,
	onEventClick,
	placeholderRef,
	renderContextMenu,
	state,
	enableRescheduling,
}: OverflowCardProps) {
	const date = tryDate(state.overflowAnchor?.dataset.date);

	if (!date || !state.overflowAnchor) return <></>;
	return (
		<EventsCalendarPopover anchor={state.overflowAnchor} isOpen={state.overflowIsOpen}>
			<div className={classes.overflowCard}>
				<span className={classes.label}>{date.format('dddd, MMMM D')}</span>
				<div className={classes.eventsWrapper}>
					{arrangeWeekEvents(filterByDate(events, date)).map(event => (
						<Event
							view='month'
							isInOverflow
							key={event.id}
							enableRescheduling={enableRescheduling}
							compact={compact}
							date={date}
							dispatch={dispatch}
							event={event}
							onEventClick={onEventClick}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					))}
				</div>
			</div>
		</EventsCalendarPopover>
	);
}
