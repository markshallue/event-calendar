import { Dispatch, ReactNode, RefObject, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Month.module.css';

import { arrangeWeekEvents, filterByWeek } from '~/utils';
import { CalendarAction, CalendarState } from '~/types';
import { CalendarEvent, MouseEventHandler, EventsCalendarContextMenuProps } from '~/types';

import { CellContainer } from '~/components';
import { useElementSize } from '~/hooks';

import { getMonthDates } from '../utils/getMonthDates';
import { getMaxEvents } from '../utils/getMaxEvents';

import { MonthHeader } from './MonthHeader';

interface MonthProps {
	hasPopover: boolean;
	enableDragNDrop: boolean;
	compact: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	eventsArray: CalendarEvent[];
	handleMouseEvent: MouseEventHandler;
	placeholderRef: RefObject<HTMLDivElement>;
	renderContextMenu: ((props: EventsCalendarContextMenuProps) => ReactNode) | undefined;
	state: CalendarState;
}

export function Month({
	hasPopover,
	enableDragNDrop,
	compact,
	activeDate,
	dispatch,
	eventsArray,
	handleMouseEvent,
	placeholderRef,
	renderContextMenu,
	state,
}: MonthProps) {
	// Calculate dates within current view
	const monthDates = useMemo(() => getMonthDates(activeDate), [activeDate]);
	const minMaxDatesInView = { first: monthDates.first, last: monthDates.last };

	// Calculate the max number of events that fit within a cell
	const { ref: gridRef, height: gridHeight } = useElementSize();
	const ROW_HEIGHT = gridHeight / monthDates.weeks.length;
	const EVENT_LIMIT = getMaxEvents(ROW_HEIGHT, compact);

	// Handlers
	const handleStopDrag = () => {
		if (state.dragActive || state.eventDragActive) dispatch({ type: 'stop_drag_events' });
	};

	return (
		<div className={classes.calendar}>
			<MonthHeader isCompact={compact} />
			<div className={classes.grid} onMouseLeave={handleStopDrag} ref={gridRef}>
				{monthDates.weeks.map((week, index) => {
					// Filter events to those only within the current week view, then arrange dates to create a dense fit
					const orderedEvents = arrangeWeekEvents(filterByWeek(eventsArray, week[0].date));

					return (
						<div key={index} className={classes.row}>
							{week.map((dayRecord, index) => (
								<CellContainer
									key={index}
									EVENT_LIMIT={EVENT_LIMIT}
									enableDragNDrop={enableDragNDrop}
									hasPopover={hasPopover}
									compact={compact}
									dayRecord={dayRecord}
									dispatch={dispatch}
									handleMouseEvent={handleMouseEvent}
									isWeekHeader={false}
									minMaxDatesInView={minMaxDatesInView}
									orderedEvents={orderedEvents}
									placeholderRef={placeholderRef}
									renderContextMenu={renderContextMenu}
									state={state}
								/>
							))}
						</div>
					);
				})}
			</div>
		</div>
	);
}
