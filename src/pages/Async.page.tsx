import { Paper, Text, Title } from '@mantine/core';
import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper, CalendarWrapper } from '@/layout';
import { useDemoDataRequest } from '@/data/hooks';
import { CodeHighlight } from '@mantine/code-highlight';

export function Async() {
	const { data: events, isLoading } = useDemoDataRequest(2000);

	const exampleCode = `
import { EventsCalendar } from 'events-calendar';

function Async() {
  const { data: events, isLoading } = useDemoDataRequest(2000);

  return <EventsCalendar events={events} isFetching={isLoading} />;
}
`;

	return (
		<PageWrapper>
			<Title mb='sm'>Asynchronous data fetching</Title>
			<Text mb='md'>Set the isFetching prop to true to activate the loading overlay.</Text>
			<Paper withBorder radius='md' bg='white' p='sm' mb='md'>
				<CodeHighlight code={exampleCode} />
			</Paper>

			<CalendarWrapper>
				<EventsCalendar events={events} isFetching={isLoading} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
