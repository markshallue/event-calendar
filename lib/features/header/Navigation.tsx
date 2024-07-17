import dayjs, { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import classes from './Header.module.css';

import { CalendarView } from '~/types';
import { HeaderButton } from './HeaderButton';

interface NavigationProps {
	activeDate: Dayjs;
	setActiveDate: Dispatch<SetStateAction<Dayjs>>;
	view: CalendarView;
}

export function Navigation({ activeDate, setActiveDate, view }: NavigationProps) {
	// Navigation handlers
	const handleToday = () => setActiveDate(dayjs());
	const handleNext = (increment: CalendarView) => setActiveDate(currDate => currDate.add(1, increment));
	const handlePrev = (increment: CalendarView) => setActiveDate(currDate => currDate.subtract(1, increment));

	// Functions
	const returnTitle = (currDate: Dayjs) => {
		const weekStart = currDate.startOf('week');
		const weekEnd = currDate.endOf('week');
		return view === 'month'
			? currDate.format('MMMM YYYY')
			: view === 'week'
			? `${weekStart.format('MMM DD')} - ${weekEnd.format('MMM DD, YYYY')}`
			: currDate.format('D MMMM, YYYY');
	};

	return (
		<div className={classes.navigation}>
			<HeaderButton variant='outline' onClick={handleToday}>
				Today
			</HeaderButton>
			<div className={classes.actions}>
				<HeaderButton variant='subtle' onClick={() => handlePrev(view)}>
					<IconChevronLeft size='1.5rem' stroke={2} />
				</HeaderButton>
				<HeaderButton variant='subtle' onClick={() => handleNext(view)}>
					<IconChevronRight size='1.5rem' stroke={2} />
				</HeaderButton>
			</div>
			<span className={classes.date}>{returnTitle(activeDate)}</span>
		</div>
	);
}
