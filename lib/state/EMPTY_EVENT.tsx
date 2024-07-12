import dayjs from 'dayjs';
import { PlaceholderEvent } from '../types';

export const EMPTY_EVENT: PlaceholderEvent = {
	id: null,
	dragId: null,
	title: 'Untitled',
	info: '',
	groups: [{ label: '', color: '#0ea5e9' }],
	start: dayjs(),
	end: dayjs(),
	startTime: undefined,
	endTime: undefined,
	isActive: false,
	isAllDay: true,
	content: [],
	images: [],
	indent: 0,
	order: 0,
};
