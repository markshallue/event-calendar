import { Box, Title } from '@mantine/core';

import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';
import { PageWrapper, CalendarWrapper } from '@/layout';

import { useDemoDataRequest } from '@/data/hooks';

const HEADER_HEIGHT = 52;

export function CustomHeader() {
	const { data: events } = useDemoDataRequest();

	const calendar = useEventsCalendar({});

	const customHeader = (
		<div
			style={{
				padding: '0.75rem 1rem',
				borderBottom: '1px solid red',
				display: 'flex',
				height: HEADER_HEIGHT,
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
		<PageWrapper>
			<Title mb='sm'>Custom header element</Title>
			<CalendarWrapper>
				{customHeader}
				<Box h={`calc(100% - ${HEADER_HEIGHT}px)`}>
					<EventsCalendar
						noHeader
						calendar={calendar}
						events={events}
						onEventClick={({ openPopover }) => openPopover()}
						renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
					/>
				</Box>
			</CalendarWrapper>
		</PageWrapper>
	);
}
