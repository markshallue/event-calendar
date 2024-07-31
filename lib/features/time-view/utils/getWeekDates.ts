import { DateRecord } from '~/types';
import { Dayjs } from 'dayjs';

export const getWeekDates = (activeDate: Dayjs, view: 'day' | 'week') => {
	if (view === 'day') return [{ date: activeDate }];

	const startOfWeek = activeDate.startOf('week');
	const startOfCalendarWeek = startOfWeek.subtract(startOfWeek.day(), 'd');
	let tempDate = startOfCalendarWeek;
	const datesArray: DateRecord[] = [];
	for (let index = 0; index < 7; index++) {
		datesArray.push({ date: tempDate, isCurrentMonth: tempDate.month() === activeDate.month() });
		tempDate = tempDate.add(1, 'day');
	}
	return datesArray;
};
