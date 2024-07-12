import { OrderedCalendarEvent } from '~/types';
import { CSSProperties } from 'react';
import { Dayjs } from 'dayjs';

export const getEventWrapperStyles = (
	isInPopover: boolean,
	event: OrderedCalendarEvent,
	date: Dayjs,
	isCompact: boolean,
	isWeekHeader: boolean,
	isDayHeader: boolean
) => {
	if (isInPopover) return {};
	const weekStart = event.start.isSame(date, 'w') ? event.start.day() : 0;
	const weekEnd = event.end.isSame(date, 'w') ? event.end.day() : 6;
	const styles: CSSProperties = {
		position: 'absolute',
		left: isDayHeader ? '0.125rem' : `calc(${(weekStart * 100) / 7}% + 0.125rem)`,
		top: `calc(${isDayHeader ? 4 : isCompact ? 24 : 26}px + ${event.order * (isCompact ? 21 : 22)}px + ${
			isWeekHeader ? 6 : 0
		}px)`,
		width: isDayHeader ? 'calc(100% - 6px)' : `calc(${(100 * (1 + (weekEnd - weekStart))) / 7}% - 0.25rem - 1px)`,
	};
	return styles;
};
