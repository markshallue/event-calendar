import { Title } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper, CalendarWrapper } from '@/layout';
import { useDemoDataRequest } from '@/data/hooks';

export function Async() {
	const { data: events, isLoading } = useDemoDataRequest(2000);

	return (
		<PageWrapper>
			<Title mb='sm'>Asynchronous data fetching</Title>
			<CalendarWrapper>
				<EventsCalendar enableRescheduling events={events} isFetching={isLoading} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
