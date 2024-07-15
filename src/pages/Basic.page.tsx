import { Paper, Title } from '@mantine/core';

import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper } from '@/layout/PageWrapper';
import useDemoDataRequest from '@/data/hooks/useDemoDataRequest';

export function Basic() {
	const { data: events } = useDemoDataRequest();

	return (
		<PageWrapper>
			<Title mb='sm'>Basic calendar</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar enableRescheduling events={events} />
			</Paper>
		</PageWrapper>
	);
}
