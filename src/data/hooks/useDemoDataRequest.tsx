import { useEffect, useState } from 'react';
import { CalendarEvent } from '~/types';
import { createDemoEvent } from '../utils';

// Create demo events
const NUM_EVENTS = 100;
const demoEvents: CalendarEvent[] = [];
for (let index = 0; index < NUM_EVENTS; index++) {
	demoEvents.push(createDemoEvent(index));
}

export function useDemoDataRequest(delay: number = 0) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, delay);
	}, [setIsLoading, delay]);

	return { data: isLoading ? undefined : demoEvents, isLoading };
}
