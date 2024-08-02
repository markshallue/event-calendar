import { Paper, Text, Title } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';

import { EventsCalendar } from '~/EventsCalendar';
import { CalendarWrapper, PageWrapper } from '@/layout';

import events from '@/data/events.json';

export function Responsive() {
	const exampleCode = `
import { EventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

function Responsive() {
  return (
    <div style={{ height: '60vh' }}>
        <EventsCalendar events={events} />
    </div>
  );
}
`;

	return (
		<PageWrapper>
			<Title mb='sm'>Responsive calendar</Title>
			<Text mb='md'>
				The calendar will grow to fill its container. Resize the window to see the calendar automatically show/hide events
				based on the available space.
			</Text>
			<Paper withBorder radius='md' bg='white' p='sm' mb='md'>
				<CodeHighlight code={exampleCode} />
			</Paper>
			<CalendarWrapper style={{ height: '60vh' }}>
				<EventsCalendar events={events} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
