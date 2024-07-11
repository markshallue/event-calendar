import { getDateTimeLabel } from '~/utils/functions';
import classes from './DateTimeLabel.module.css';
import { CalendarEvent } from '~/types';

export function DateTimeLabel({ event }: { event: CalendarEvent }) {
	const { start, end, startTime, endTime, isAllDay } = event;
	const isBlurred = !start;

	return (
		<p className={classes.label} data-blur={isBlurred}>
			{getDateTimeLabel(start, end, startTime, endTime, isAllDay)}
		</p>
	);
}
