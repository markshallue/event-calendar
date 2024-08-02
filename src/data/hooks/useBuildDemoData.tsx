import { useState, useEffect } from 'react';

import { CalendarEvent } from '~/types';
import { CalendarGroup } from '@/types';

import { useDemoDataRequest } from './useDemoDataRequest';
import { useDemoGroupsRequest } from './useDemoGroupsRequest';

export function useBuildDemoData(delay: number = 0) {
	// Calendar State
	const [calendarData, setCalendarData] = useState<CalendarEvent[] | undefined>(undefined);
	const [groups, setGroups] = useState<CalendarGroup[]>([]);
	const [isFetching, setIsFetching] = useState(true);

	// Get calendar and grouping data
	const demoData = useDemoDataRequest(delay);
	const demoGroups = useDemoGroupsRequest(delay);
	const requestsLoading = demoData.isLoading || demoGroups.isLoading;

	// Build calendar data on API response
	useEffect(() => {
		if (requestsLoading) return;

		// Update state
		setGroups(demoGroups.data || []);
		setCalendarData(demoData.data);
		setIsFetching(false);
	}, [demoData.data, demoGroups.data, requestsLoading]);

	return {
		calendarData,
		groups,
		isFetching,
		setCalendarData,
	};
}
