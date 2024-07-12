import { Dispatch, ReactNode, RefObject } from 'react';
import dayjs from 'dayjs';
import classes from './OverflowCard.module.css';

import { CalendarEvent, EventsCalendarContextMenuProps, CalendarAction, CalendarState } from '~/types';

import { filterByDate } from '~/utils/functions';

import { arrangeWeekEvents } from '~/utils';
import { Popover, CellItem } from '~/components';

interface OverflowCardProps {
	hasPopover: boolean;
	compact: boolean;
	dispatch: Dispatch<CalendarAction>;
	events: CalendarEvent[];
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
	enableDragNDrop: boolean;
}

/* 
    Create dayjs date object if string is defined
*/
const tryDate = (dateString?: string) => (dateString ? dayjs(dateString) : undefined);

export function OverflowCard({
	hasPopover,
	compact,
	dispatch,
	events,
	placeholderRef,
	renderContextMenu,
	state,
	enableDragNDrop,
}: OverflowCardProps) {
	const date = tryDate(state.overflowAnchor?.dataset.date);

	if (!date) return;
	return (
		<Popover anchor={state.overflowAnchor} dispatch={dispatch} isOpen={state.overflowIsOpen}>
			<div className={classes.overflowCard}>
				<span className={classes.label}>{date.format('dddd, MMMM D')}</span>
				<div className={classes.scrollWrapper}>
					{arrangeWeekEvents(filterByDate(events, date)).map(event => (
						<CellItem
							isInWeekHeader
							isInOverflow
							key={event.id}
							enableDragNDrop={enableDragNDrop}
							hasPopover={hasPopover}
							compact={compact}
							date={date}
							dispatch={dispatch}
							event={event}
							placeholderRef={placeholderRef}
							renderContextMenu={renderContextMenu}
							state={state}
						/>
					))}
				</div>
			</div>
		</Popover>
	);
}
