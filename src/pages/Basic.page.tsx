import { Paper, Text, Title } from '@mantine/core';
import { CodeHighlightTabs } from '@mantine/code-highlight';

import { getFileIcon } from '@/examples/utils';
import { CalendarWrapper, PageWrapper } from '@/layout';
import { BasicExample } from '@/examples/BasicExample';

const exampleCode = `
import { EventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

function BasicExample() {
    return <EventsCalendar events={events} />;
}
`;

const jsonCode = `
[
    {
        "id": 1,
        "title": "Team Meeting",
        "start": "2024-05-04T0:00:00.000Z",
        "end": "2024-05-08T0:00:00.000Z",
        "groups": [ { "label": "In progress", "color": "#FAB005" } ],
        "isAllDay": true,
        "content": [ 
            { "label": "Description", "content": "Discuss project updates and deadlines." }, 
            { "label": "Staff", "content": [ "Erick Reynold", "Herbert Cummerat", "Steven Herman" } ],
        "images": ["/src/data/images/demoImage3.jpg"]
    },
    ...
]
`;

export function Basic() {
	return (
		<PageWrapper>
			<Title mb='sm'>Basic calendar</Title>
			<Text mb='md'>At its most basic, just pass the calendar an events array to display data.</Text>
			<Paper withBorder radius='md' bg='white' p='sm' mb='md'>
				<CodeHighlightTabs
					getFileIcon={getFileIcon}
					code={[
						{ fileName: 'BasicExample.tsx', code: exampleCode, language: 'tsx' },
						{ fileName: 'events.json', code: jsonCode, language: 'ts' },
					]}
				/>
			</Paper>
			<CalendarWrapper>
				<BasicExample />
			</CalendarWrapper>
		</PageWrapper>
	);
}
