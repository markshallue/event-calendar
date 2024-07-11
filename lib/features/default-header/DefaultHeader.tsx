import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import { CalendarView } from '~/types';
import classes from './DefaultHeader.module.css';

import { DefaultNavigation } from './DefaultNavigation';
import { DefaultControls } from './DefaultControls';

interface DefaultHeaderProps {
	date: Dayjs;
	view?: CalendarView;
	maxDate?: Dayjs | null;
	minDate?: Dayjs | null;
	views: CalendarView[];
	setDate: Dispatch<SetStateAction<Dayjs>>;
	setView?: Dispatch<SetStateAction<CalendarView>>;
	children?: ReactNode;
}
export function DefaultHeader({ date, setDate, setView, views, view = 'month', children }: DefaultHeaderProps) {
	return (
		<div className={classes.header}>
			<DefaultNavigation date={date} setDate={setDate} view={view} />
			<DefaultControls views={views} setView={setView} view={view}>
				{children}
			</DefaultControls>
		</div>
	);
}
