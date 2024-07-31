import { Dispatch, ReactNode, RefObject, useMemo } from 'react';
import { Dayjs } from 'dayjs';
import classes from './Month.module.css';

import { arrangeWeekEvents, filterByWeek } from '~/utils';
import { CalendarAction, CalendarState, EventClickProps, EventEditProps } from '~/types';
import { CalendarEvent, MouseEventHandler, EventsCalendarContextMenuProps } from '~/types';

import { CellContainer, CircularLoader } from '~/components';
import { useElementSize } from '~/hooks';

import { getMonthDates } from '../utils/getMonthDates';
import { getMaxEvents } from '../utils/getMaxEvents';

import { MonthHeader } from './MonthHeader';

interface MonthProps {
	enableRescheduling: boolean;
	compact: boolean;
	activeDate: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	eventsArray: CalendarEvent[];
	handleMouseEvent: MouseEventHandler;
	handleStopDrag: () => void;
	onEventClick?: (props: EventClickProps) => void;
	onEventReschedule?: (props: EventEditProps) => void;
	renderContextMenu?: (props: EventsCalendarContextMenuProps) => ReactNode;
	placeholderRef: RefObject<HTMLDivElement>;
	state: CalendarState;
}

export function Month({
	enableRescheduling,
	compact,
	activeDate,
	dispatch,
	eventsArray,
	handleMouseEvent,
	handleStopDrag,
	onEventClick,
	onEventReschedule,
	placeholderRef,
	renderContextMenu,
	state,
}: MonthProps) {
	// Calculate dates within current view
	const monthDates = useMemo(() => getMonthDates(activeDate), [activeDate]);
	const minMaxDatesInView = { first: monthDates.first, last: monthDates.last };

	// Calculate the max number of events that fit within a cell
	const { ref: gridRef, height: gridHeight } = useElementSize();
	const gridLoaded = gridHeight > 0;
	const ROW_HEIGHT = gridHeight / monthDates.weeks.length;
	const EVENT_LIMIT = getMaxEvents(ROW_HEIGHT, compact);

	return (
		<div className={classes.calendar}>
			<CircularLoader visible={!gridLoaded} />
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
									enableRescheduling={enableRescheduling}
									compact={compact}
									dayRecord={dayRecord}
									dispatch={dispatch}
									handleMouseEvent={handleMouseEvent}
									isInWeekHeader={false}
									minMaxDatesInView={minMaxDatesInView}
									onEventClick={onEventClick}
									onEventReschedule={onEventReschedule}
									orderedEvents={gridLoaded ? orderedEvents : []}
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
