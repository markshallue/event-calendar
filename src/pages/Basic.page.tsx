import { Title } from '@mantine/core';

import { EventsCalendar } from '~/EventsCalendar';

import { CalendarWrapper, PageWrapper } from '@/layout';
import { useDemoDataRequest } from '@/data/hooks';

export function Basic() {
	const { data: events } = useDemoDataRequest();

	return (
		<PageWrapper>
			<Title mb='sm'>Basic calendar</Title>
			<CalendarWrapper>
				<EventsCalendar events={events} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
