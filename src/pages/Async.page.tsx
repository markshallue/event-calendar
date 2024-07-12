import useDemoDataRequest from '@/data/hooks/useDemoDataRequest';
import { PageWrapper } from '@/layout/PageWrapper';
import { Paper, Title } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

export function Async() {
	const { data: events, isLoading } = useDemoDataRequest(2000);

	return (
		<PageWrapper>
			<Title mb='sm'>Asynchronous data fetching</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar enableDragNDrop events={events} isFetching={isLoading} />
			</Paper>
		</PageWrapper>
	);
}
