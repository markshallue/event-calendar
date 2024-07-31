import { DateRecord, MonthDates } from '~/types';
import { Dayjs } from 'dayjs';

/* 
    Creates array of dates centred on the current month
*/
export const getMonthDates = (activeDate: Dayjs): MonthDates => {
	const startOfMonth = activeDate.startOf('month');
	const startOfCalendarMonth = startOfMonth.subtract(startOfMonth.day(), 'd');
	let tempDate = startOfCalendarMonth;
	const nextMonth = activeDate.add(1, 'month').month();
	let weekDates: DateRecord[] = [];
	const allDates: DateRecord[][] = [];
	let dayOfWeekIndex = 1;
	while (tempDate.subtract(tempDate.day(), 'd').month() !== nextMonth) {
		weekDates.push({ date: tempDate, isCurrentMonth: tempDate.month() === activeDate.month() });
		if (dayOfWeekIndex === 7) {
			allDates.push(weekDates);
			weekDates = [];
			dayOfWeekIndex = 0;
		}
		dayOfWeekIndex++;
		tempDate = tempDate.add(1, 'day');
	}
	return { weeks: allDates, first: startOfCalendarMonth, last: tempDate };
};
