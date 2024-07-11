import { useEffect, useState } from 'react';
import { CalendarEvent } from '~/types';
import { createDemoEvent } from '../createDemoEvent';

// Create demo events
const NUM_EVENTS = 100;
const demoEvents: CalendarEvent[] = [];
for (let index = 0; index < NUM_EVENTS; index++) {
	demoEvents.push(createDemoEvent(index));
}

export default function useDemoDataRequest(delay?: number) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, delay);
	}, [setIsLoading, delay]);

	return { data: isLoading ? undefined : demoEvents, isLoading };
}
