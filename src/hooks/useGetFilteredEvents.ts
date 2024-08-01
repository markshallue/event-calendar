import { useMemo } from 'react';
import { RawCalendarEvent } from '~/types';

interface useGetFilteredEventsProps {
	data?: RawCalendarEvent[];
	inactiveGroups?: string[];
	inactiveFilters?: string[];
}

export const filterData = (data: RawCalendarEvent[] | undefined, inactiveGroups: string[] = []) => {
	// No groupings at all
	if (!data || inactiveGroups.length === 0) return data;

	// Coloured groupings and filters
	return data.filter(event => !event.groups || event.groups.map(g => g.label).some(g => !inactiveGroups.includes(g)));
};

export function useGetFilteredEvents({ data, inactiveGroups }: useGetFilteredEventsProps) {
	const filteredData = useMemo(() => filterData(data, inactiveGroups), [data, inactiveGroups]);

	return filteredData;
}
