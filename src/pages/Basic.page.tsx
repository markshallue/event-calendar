import { Paper, Text, Title } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';

import { EventsCalendar } from '~/EventsCalendar';

import { CalendarWrapper, PageWrapper } from '@/layout';
import { useDemoDataRequest } from '@/data/hooks';

export function Basic() {
	const { data: events } = useDemoDataRequest();

	const exampleCode = `
import { EventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

function Basic() {
  return <EventsCalendar events={events} />;
}
`;

	return (
		<PageWrapper>
			<Title mb='sm'>Basic calendar</Title>
			<Text mb='md'>At its most basic, just pass the calendar an events array to display data.</Text>
			<Paper withBorder radius='md' bg='white' p='sm' mb='md'>
				<CodeHighlight code={exampleCode} />
			</Paper>
			<CalendarWrapper>
				<EventsCalendar events={events} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
