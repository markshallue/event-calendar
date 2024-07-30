import { Dayjs } from 'dayjs';
import classes from './AllDayEvent.module.css';

import { splitColorCSS } from '~/utils';
import { CalendarEvent, MinMaxDatesInView } from '~/types';

import { OverflowArrow } from '../overflow-arrow';

interface AllDayEventProps {
	date: Dayjs;
	event: CalendarEvent;
	minMaxDatesInView?: MinMaxDatesInView;
	isCompact: boolean;
	isInOverflow: boolean;
}

export function AllDayEvent({ date, event, minMaxDatesInView, isCompact, isInOverflow }: AllDayEventProps) {
	// Destructure event
	const { title, start, end, groups } = event;
	const colors = groups?.map(g => g.color).filter(Boolean) || [];
	if (colors.length === 0) colors.push('#12B886');

	// Calculate arrows for display in overflow popover
	const arrowLeft =
		(isInOverflow && start.isBefore(date, 'd')) || (minMaxDatesInView && start.isBefore(minMaxDatesInView?.first, 'd'));
	const arrowRight =
		(isInOverflow && end.isAfter(date, 'd')) || (minMaxDatesInView && end.isAfter(minMaxDatesInView?.last, 'd'));
	const arrows = arrowLeft && arrowRight ? 'both' : arrowLeft ? 'left' : arrowRight ? 'right' : false;

	// Event background color(s)
	const colorstyles = {
		backgroundColor: colors[0],
		backgroundImage: splitColorCSS(colors),
	};

	return (
		<div className={classes.allDayContainer} style={colorstyles}>
			<OverflowArrow color={colors[0]} dir='left' isHidden={!arrowLeft} isCompact={isCompact} />
			<div className={classes.allDayTextContainer} data-sm={isCompact}>
				<span className={classes.allDayText} data-arrows={arrows}>
					{title}
				</span>
			</div>
			<OverflowArrow color={colors[colors.length - 1]} dir='right' isHidden={!arrowRight} isCompact={isCompact} />
		</div>
	);
}
