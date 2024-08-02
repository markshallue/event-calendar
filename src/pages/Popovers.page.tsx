import { Paper, Text, Title } from '@mantine/core';
import { CodeHighlight } from '@mantine/code-highlight';

import { EventsCalendar } from '~/EventsCalendar';

import events from '@/data/events.json';

import { ViewPopover } from '@/components';
import { PageWrapper, CalendarWrapper } from '@/layout';

const exampleCode = `
import { EventsCalendar } from 'events-calendar';
import events from '@/data/events.json';

function Popovers() {
    return (
        <EventsCalendar 
            events={events} 
            onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
                if (isDoubleClick) { 
                    closePopover()
                } else { 
                    openPopover() 
                }
            }}
            renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} />}
        />
    );
}
`;

export function Popovers() {
	return (
		<PageWrapper>
			<Title mb='sm'>View popover</Title>
			<Text mb='md'>Use the onEventClick and renderPopover props to bind a popover to events.</Text>
			<Paper withBorder radius='md' bg='white' p='sm' mb='md'>
				<CodeHighlight code={exampleCode} />
			</Paper>
			<CalendarWrapper>
				<EventsCalendar
					events={events}
					onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
						if (isDoubleClick) {
							closePopover();
						} else {
							openPopover();
						}
					}}
					renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} />}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
