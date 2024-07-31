import { Dayjs } from 'dayjs';

export function isBetween(date: Dayjs, testStart: Dayjs, testEnd: Dayjs, startOnly: boolean = false) {
	return (
		(date.isAfter(testStart) && date.isBefore(testEnd)) ||
		date.isSame(testStart, 'd') ||
		(startOnly ? false : date.isSame(testEnd, 'd'))
	);
}
