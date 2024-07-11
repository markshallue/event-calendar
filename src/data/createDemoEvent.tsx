import dayjs from 'dayjs';
import { CalendarEvent } from '~/types';

import { STATUS_OPTIONS } from './STATUS_OPTIONS';
import { STAFF_OPTIONS } from './STAFF_OPTIONS';
import { demoJobs } from './DEMO_JOBS';
import demoImage1Url from './images/demoImage1.jpg';
import demoImage2Url from './images/demoImage2.jpg';
import demoImage3Url from './images/demoImage3.jpg';
import demoImage4Url from './images/demoImage4.jpg';
import demoImage5Url from './images/demoImage5.jpg';

const HOUR_OPTIONS = [8, 9, 10, 11, 12, 13, 14];
const IMAGE_URLS = [demoImage1Url, demoImage2Url, demoImage3Url, demoImage4Url, demoImage5Url];

export function createDemoEvent(index: number): CalendarEvent {
	// Dates
	const DAY_RANGE_PLUS_MINUS = 90;
	const IS_PAST = Math.round(Math.random()) === 0 ? 1 : -1;
	const START_DAY = Math.round(Math.random() * DAY_RANGE_PLUS_MINUS) * IS_PAST;
	const DAY_DIFF = Math.round(Math.random() * 5);

	// Time
	const IS_ALLDAY = Math.round(Math.random()) === 0;
	const START_HOUR = IS_ALLDAY ? 0 : HOUR_OPTIONS[Math.round(Math.random() * (HOUR_OPTIONS.length - 1))];
	const START_DATE = dayjs().subtract(START_DAY, 'day').hour(START_HOUR).minute(0).second(0).millisecond(0);
	const END_DATE = IS_ALLDAY ? START_DATE.add(DAY_DIFF, 'day') : START_DATE.add(Math.ceil(Math.random() * 8), 'hour');

	// Status
	const STATUS = STATUS_OPTIONS[Math.round(Math.random() * 2)].label;

	// Staff
	const STAFF = new Set<string>();
	const NUM_STAFF = Math.round(Math.random() * 6);
	for (let staffIndex = 0; staffIndex < NUM_STAFF; staffIndex += 1) {
		const j = Math.round(Math.random() * (STAFF_OPTIONS.length - 2));
		STAFF.add(STAFF_OPTIONS[j].label);
	}
	const STAFF_ARRAY = [...STAFF];

	// Images
	const IMAGES = new Set<string>();
	const NUM_IMAGES = Math.round(Math.random() * 3);
	for (let imageIndex = 0; imageIndex < NUM_IMAGES; imageIndex += 1) {
		IMAGES.add(IMAGE_URLS[Math.round(Math.random() * (IMAGE_URLS.length - 1))]);
	}
	const IMAGE_ARRAY = [...IMAGES];

	return {
		id: index + 1,
		entryId: null,
		title: demoJobs[index % demoJobs.length].label,
		start: START_DATE,
		end: END_DATE,
		groups: [{ label: STATUS, color: STATUS_OPTIONS.find(o => o.label === STATUS)?.color || '#858E96' }],
		isAllDay: IS_ALLDAY,
		startTime: IS_ALLDAY ? undefined : START_DATE.format('h:mma'),
		endTime: IS_ALLDAY ? undefined : END_DATE.format('h:mma'),
		info: demoJobs[index % demoJobs.length].info,
		content: [
			{ label: 'Description', content: demoJobs[index % demoJobs.length].info },
			{
				label: 'Staff',
				content: STAFF_OPTIONS.filter(worker => STAFF_ARRAY.includes(worker.label)),
			},
		].filter(({ content }) => content && content.length > 0),
		filter: STAFF_ARRAY.length > 0 ? STAFF_ARRAY : ['Undefined'],
		images: IMAGE_ARRAY,
	};
}
