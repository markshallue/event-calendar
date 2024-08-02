import { useEffect, useState } from 'react';
import { Paper, Text, Title } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';

import { RawCalendarEvent } from '~/types';
import { EventsCalendar } from '~/EventsCalendar';

import initialEvents from '@/data/events.json';

import { PageWrapper, CalendarWrapper } from '@/layout';

export function Async() {
	const [isFetching, setIsFetching] = useState(true);
	const [events, setEvents] = useState<RawCalendarEvent[] | undefined>(undefined);

	useEffect(() => {
		setTimeout(() => {
			setEvents(initialEvents);
			setIsFetching(false);
		}, 2000);
	}, []);

	const exampleCode = `
import { EventsCalendar } from 'events-calendar';
import initialEvents from '@/data/events.json';

function Async() {
    const [isFetching, setIsFetching] = useState(true);
    const [events, setEvents] = useState<RawCalendarEvent[] | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setEvents(initialEvents);
            setIsFetching(false);
        }, 2000);
    }, []);

    return <EventsCalendar events={events} isFetching={isFetching} />;
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
				<EventsCalendar events={events} isFetching={isFetching} />
			</CalendarWrapper>
		</PageWrapper>
	);
}
