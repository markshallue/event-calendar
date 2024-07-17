import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarAction, CalendarView } from '~/types';
import classes from './Header.module.css';

import { Navigation } from './Navigation';
import { Controls } from './Controls';

interface HeaderProps {
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
export function Header({ date, dispatch, setDate, setView, views, view = 'month', children }: HeaderProps) {
	return (
		<div className={classes.header} onMouseDown={() => dispatch({ type: 'reset_calendar' })}>
			<Navigation date={date} setDate={setDate} view={view} />
			<Controls views={views} setView={setView} view={view}>
				{children}
			</Controls>
		</div>
	);
}
