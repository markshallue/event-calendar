import { DateRecord } from '~/types';
import { Dayjs } from 'dayjs';

export const getWeekDates = (activeDate: Dayjs) => {
	const firstDate = activeDate.startOf('week').weekday(0);
	let tempDate = firstDate;
	const datesArray: DateRecord[] = [];
	for (let index = 0; index < 7; index++) {
		datesArray.push({ date: tempDate, isCurrentMonth: tempDate.month() === activeDate.month() });
		tempDate = tempDate.add(1, 'day');
	}
	return datesArray;
};
