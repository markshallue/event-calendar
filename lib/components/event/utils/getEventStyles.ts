import { CSSProperties } from 'react';
import { Dayjs } from 'dayjs';

import { OrderedCalendarEvent } from '~/types';

export const getEventStyles = (
	isInOverflow: boolean,
	event: OrderedCalendarEvent,
	date: Dayjs,
	isCompact: boolean,
	isInWeekHeader: boolean,
	isInDayHeader: boolean
) => {
	if (isInOverflow) return { width: '100%' };
	const weekStart = event.start.isSame(date, 'w') ? event.start.day() : 0;
	const weekEnd = event.end.isSame(date, 'w') ? event.end.day() : 6;
	const styles: CSSProperties = {
		position: 'absolute',
		left: isInDayHeader ? '0.125rem' : `calc(${(weekStart * 100) / 7}% + 0.125rem)`,
		top: `calc(${isInDayHeader ? 4 : isCompact ? 24 : 26}px + ${event.order * (isCompact ? 21 : 22)}px + ${
			isInWeekHeader ? 6 : 0
		}px)`,
		width: isInDayHeader ? 'calc(100% - 6px)' : `calc(${(100 * (1 + (weekEnd - weekStart))) / 7}% - 0.25rem - 1px)`,
	};
	return styles;
};
