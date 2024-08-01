import { Paper, Text, Title } from '@mantine/core';

import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';
import { PageWrapper, CalendarWrapper } from '@/layout';

import { useDemoDataRequest } from '@/data/hooks';
import { CodeHighlight } from '@mantine/code-highlight';

export function CustomHeader() {
	const { data: events } = useDemoDataRequest();

	const calendar = useEventsCalendar();

	const customHeader = (
		<div
			style={{
				padding: '0.75rem 1rem',
				borderBottom: '1px solid red',
				display: 'flex',
				height: 65,
				justifyContent: 'space-between',
			}}
		>
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<button onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>Previous month</button>
				<button onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>Next month</button>
			</div>
			<span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'tomato' }}>
				{calendar.activeDate.format('MMMM YYYY')}
			</span>
		</div>
	);

	const exampleCode = `
import { EventsCalendar, useEventsCalendar } from 'events-calendar';

function CustomHeader() {
    const { data: events } = useDemoDataRequest();

    const calendar = useEventsCalendar();

    const customHeader = (
        <div
            style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid red',
                display: 'flex',
                height: 65,
                justifyContent: 'space-between',
            }}
        >
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>Previous month</button>
            <button onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>Next month</button>
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'tomato' }}>
            {calendar.activeDate.format('MMMM YYYY')}
        </span>
        </div>
    );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {customHeader}
        <EventsCalendar
            noHeader
            calendar={calendar}
            events={events}
            onEventClick={({ openPopover }) => openPopover()}
            renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
        />
    </div>
  );

}
`;

	return (
		<PageWrapper>
			<Title mb='sm'>Custom header element</Title>
			<Text mb='md'>Use the useEventsCalendar hook to create a custom header component.</Text>
			<Paper withBorder radius='md' bg='white' p='sm' mb='md'>
				<CodeHighlight code={exampleCode} language='tsx' copyLabel='Copy button code' copiedLabel='Copied!' />
			</Paper>
			<CalendarWrapper>
				<div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
					{customHeader}
					<EventsCalendar
						noHeader
						calendar={calendar}
						events={events}
						onEventClick={({ openPopover }) => openPopover()}
						renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
					/>
				</div>
			</CalendarWrapper>
		</PageWrapper>
	);
}
