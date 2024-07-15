import { useState } from 'react';
import { Paper, Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';

import { PageWrapper } from '@/layout/PageWrapper';

import { demoData } from '@/data/constants/demoData';
import { exampleSubmitHandler } from '@/utils/exampleSubmitHandler';

export function DragNDrop() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	return (
		<PageWrapper>
			<Title mb='sm'>Drag-n-drop event rescheduling</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar
					enableRescheduling
					calendar={calendar}
					events={events}
					onEventReschedule={({ clickedEvent, newEvent, reset }) => {
						if (newEvent === null) return;
						exampleSubmitHandler({ type: 'reschedule', id: clickedEvent.id, event: newEvent }, events, setEvents);
						reset();
					}}
					onEventClick={({ openPopover }) => openPopover()}
					renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
				/>
			</Paper>
		</PageWrapper>
	);
}
