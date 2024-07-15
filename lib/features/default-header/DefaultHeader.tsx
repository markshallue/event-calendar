import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarAction, CalendarView } from '~/types';
import classes from './DefaultHeader.module.css';

import { DefaultNavigation } from './DefaultNavigation';
import { DefaultControls } from './DefaultControls';

interface DefaultHeaderProps {
	date: Dayjs;
	dispatch: Dispatch<CalendarAction>;
	view?: CalendarView;
	maxDate?: Dayjs | null;
	minDate?: Dayjs | null;
	views: CalendarView[];
	setDate: Dispatch<SetStateAction<Dayjs>>;
	setView?: Dispatch<SetStateAction<CalendarView>>;
	children?: ReactNode;
}
export function DefaultHeader({
	date,
	dispatch,
	setDate,
	setView,
	views,
	view = 'month',
	children,
}: DefaultHeaderProps) {
	return (
		<div className={classes.header} onMouseDown={() => dispatch({ type: 'reset_calendar' })}>
			<DefaultNavigation date={date} setDate={setDate} view={view} />
			<DefaultControls views={views} setView={setView} view={view}>
				{children}
			</DefaultControls>
		</div>
	);
}
