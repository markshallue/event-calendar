import { OrderedCalendarEvent } from '~/types';
import { splitColourCSS } from '~/utils';

const OVERLAP_MARGIN = 20;
export const getWeekOrDayEventStyles = (
	event: OrderedCalendarEvent,
	timeDuration: number,
	dayIndex: number,
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
		backgroundImage: splitColourCSS(colors),
		borderWidth: event.indent > 0 ? (timeDuration > 30 ? '1px' : '0.5px') : 0,
		marginLeft: OVERLAP_MARGIN * event.indent + sundayOffset,
		width: `calc(100% - ${OVERLAP_MARGIN * (event.indent + 1) + sundayOffset}px)`,
		zIndex: isActive ? 299 : 201 + event.order,
	};
};
