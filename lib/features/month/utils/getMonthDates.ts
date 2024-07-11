import { DateRecord, MonthDates } from '~/types';
import dayjs, { Dayjs } from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

/* 
    Creates array of dates centred on the current month
*/
export const getMonthDates = (activeDate: Dayjs): MonthDates => {
	const firstDate = activeDate.startOf('month').weekday(0);
	let tempDate = firstDate;
	const nextMonth = activeDate.add(1, 'month').month();
	let weekDates: DateRecord[] = [];
	const allDates: DateRecord[][] = [];
	let dayOfWeekIndex = 1;
	while (tempDate.weekday(0).month() !== nextMonth) {
		weekDates.push({ date: tempDate, isCurrentMonth: tempDate.month() === activeDate.month() });
		if (dayOfWeekIndex === 7) {
			allDates.push(weekDates);
			weekDates = [];
			dayOfWeekIndex = 0;
		}
		dayOfWeekIndex++;
		tempDate = tempDate.add(1, 'day');
	}
	return { weeks: allDates, first: firstDate, last: tempDate };
};
