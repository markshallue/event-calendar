import { Dayjs } from 'dayjs';

export type FormPopoverValues = {
	end: Date;
	groups: string[];
	info: string;
	startTime: string | null;
	endTime: string | null;
	start: Date;
	title: string;
};

export type FormPopoverReturnValues = {
	end: Dayjs;
	groups: string[];
	info: string;
	startTime: string | null;
	endTime: string | null;
	start: Dayjs;
	title: string;
};
