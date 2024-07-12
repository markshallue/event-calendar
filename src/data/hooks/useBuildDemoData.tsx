import { useState, useEffect } from 'react';

import useDemoDataRequest from './useDemoDataRequest';
import useDemoGroupsRequest from './useDemoGroupsRequest';
import useDemoFiltersRequest from './useDemoFiltersRequest';

import { CalendarEvent } from '~/types';
import { CalendarGroup } from '@/components/form-popover/types';

export function useBuildDemoData(delay: number = 0) {
	// Calendar State
	const [calendarData, setCalendarData] = useState<CalendarEvent[] | undefined>(undefined);
	const [groups, setGroups] = useState<CalendarGroup[]>([]);
	const [filters, setFilters] = useState<CalendarGroup[]>([]);
	const [isFetching, setIsFetching] = useState(true);

	// Get calendar and grouping data
	// const demoForm = useDemoRequest('form');
	// const demoData = useDemoRequest('newEvent');
	const demoData = useDemoDataRequest(delay);
	const demoGroups = useDemoGroupsRequest(delay);
	const demoFilters = useDemoFiltersRequest(delay);
	const requestsLoading = demoData.isLoading || demoGroups.isLoading || demoFilters.isLoading;

	// Build calendar data on API response
	useEffect(() => {
		if (requestsLoading) return;

		// TODO: Replace with real data
		// const filteredData = filterInvalidDates(demoData.data, fields.start, fields.end);
		// const transformedData = buildCalendarData(path, apikey, filteredData, fields, demoGroups.data);

		// Update state
		setGroups(demoGroups.data || []);
		setFilters(demoFilters.data || []);
		setCalendarData(demoData.data);
		setIsFetching(false);
	}, [demoData.data, demoGroups.data, demoFilters.data, requestsLoading]);

	return {
		calendarData,
		filters,
		groups,
		isFetching,
		setCalendarData,
	};
}
