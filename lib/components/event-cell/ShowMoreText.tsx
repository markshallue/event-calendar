import { Dispatch, MouseEvent, useRef } from 'react';
import { Dayjs } from 'dayjs';
import classes from './EventCell.module.css';

import { CalendarAction, CalendarState } from '~/types';

interface ShowMoreTextProps {
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	isCompact: boolean;
	numOverflowEvents: number;
	state: CalendarState;
}

export function ShowMoreText({ date, dispatch, isCompact, numOverflowEvents, state }: ShowMoreTextProps) {
	const ref = useRef<HTMLDivElement>(null);

	const handleClick = (e: MouseEvent) => {
		if (state.overflowIsOpen && e.target === state.overflowAnchor) {
			dispatch({ type: 'reset_to_default' });
		} else {
			dispatch({ type: 'open_overflow', date: date, anchor: ref.current });
		}
	};

	return (
		<div
			className={classes.showMoreText}
			data-sm={isCompact}
			data-date={date.format('DD-MMM-YYYY')}
			onClick={handleClick}
			onMouseDown={e => e.stopPropagation()}
			ref={ref}
		>
			<span className={classes.smOnly}>{`+${numOverflowEvents}`}</span>
			<span className={classes.lgOnly}>{numOverflowEvents} more</span>
		</div>
	);
}
