import { CalendarEvent } from '~/types';
import { splitColourCSS } from '~/utils/functions';
import classes from './EventCell.module.css';

interface TimeEventProps {
	event: CalendarEvent;
	isCompact: boolean;
}

export function TimeEvent({ event, isCompact }: TimeEventProps) {
	// Destructure event
	const { title, start, groups } = event;
	const colors = groups?.map(g => g.color).filter(Boolean) || [];
	if (colors.length === 0) colors.push('#12B886');

	const timeStyles = {
		border: `1px solid ${colors[0]}`,
		width: '100%',
	};

	// Event background color(s)
	const colorStyles = {
		backgroundColor: colors[0],
		backgroundImage: splitColourCSS(colors),
	};

	return (
		<div className={`${classes.timeContainer}`} data-sm={isCompact} style={timeStyles}>
			<div className={`${classes.timeDot}`} style={colorStyles}></div>
			<div className={`${classes.timeText}`}>{start.format('h:mma')}</div>
			<span className={`${classes.timeLabel}`}>{title}</span>
		</div>
	);
}
