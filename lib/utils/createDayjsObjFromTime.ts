import dayjs from 'dayjs';

export const createDayjsObjFromTime = (
	startTime: string | null,
	endTime: string | null,
	startString: string = '01-Jan-2000',
	endString: string = '01-Jan-2000'
) => {
	const formattedStartTime = startTime?.replace(/.{2}$/, ' $&').toUpperCase() || '12:00 AM';
	const formattedEndTime = endTime?.replace(/.{2}$/, ' $&').toUpperCase() || '12:00 AM';
	const start = dayjs(`${startString} ${formattedStartTime}`);
	const end = dayjs(`${endString} ${formattedEndTime}`);
	return { start, end };
};
