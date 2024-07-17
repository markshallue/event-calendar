import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarView } from '~/types';
import classes from './Header.module.css';

import { Navigation } from './Navigation';
import { Controls } from './Controls';

interface HeaderProps {
	activeDate: Dayjs;
	view?: CalendarView;
	hideViewToggle?: boolean;
	maxDate?: Dayjs | null;
	minDate?: Dayjs | null;
	onClick?: () => void;
	setActiveDate: Dispatch<SetStateAction<Dayjs>>;
	setView?: Dispatch<SetStateAction<CalendarView>>;
	views?: CalendarView[];
	customControls?: ReactNode;
}
export function Header({
	activeDate,
	onClick = () => null,
	hideViewToggle,
	setActiveDate,
	setView,
	views = ['month', 'week', 'day'],
	view = 'month',
	customControls,
}: HeaderProps) {
	return (
		<div className={classes.header} onClick={onClick}>
			<Navigation activeDate={activeDate} setActiveDate={setActiveDate} view={view} />
			<Controls hideViewToggle={hideViewToggle} views={views} setView={setView} view={view}>
				{customControls}
			</Controls>
		</div>
	);
}
