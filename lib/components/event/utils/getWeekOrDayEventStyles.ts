import { splitColorCSS } from '~/utils';
import { OrderedCalendarEvent } from '~/types';

export const getWeekOrDayEventStyles = (
	event: OrderedCalendarEvent,
	timeDuration: number,
	dayIndex: number,
	overlapOffset: number,
	isActive: boolean
) => {
	const colors = event.groups?.map(g => g.color).filter(Boolean) || [];
	const sundayOffset = dayIndex === 0 ? 6 : 0;
	if (colors.length === 0) colors.push('#12B886');

	return {
		gridColumnStart: dayIndex + 1,
		gridRowStart: event.start && event.start.hour() * 4 + Math.round(event.start.minute() / 15) + 1,
		gridRowEnd: event.end && event.end.hour() * 4 + Math.round(event.end.minute() / 15) + 1,
		height: 12 * ((timeDuration || 60) / 15) - 1,
		backgroundColor: colors[0],
		backgroundImage: splitColorCSS(colors),
		borderWidth: event.indent > 0 ? (timeDuration > 30 ? '1px' : '0.5px') : 0,
		marginLeft: overlapOffset * event.indent + sundayOffset,
		width: `calc(100% - ${overlapOffset * (event.indent + 1) + sundayOffset}px)`,
		zIndex: isActive ? 100 : 51 + event.order,
	};
};
