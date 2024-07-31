import { useState } from 'react';
import { Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';
import { demoData } from '@/data/constants';
import { exampleSubmitHandler } from '@/utils';
import { PageWrapper, CalendarWrapper } from '@/layout';

export function DragNDrop() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	return (
		<PageWrapper>
			<Title mb='sm'>Drag-n-drop event rescheduling</Title>
			<CalendarWrapper>
				<EventsCalendar
					enableRescheduling
					calendar={calendar}
					events={events}
					onEventReschedule={({ clickedEvent, newEvent, reset }) => {
						exampleSubmitHandler({ type: 'reschedule', id: clickedEvent.id, event: newEvent }, events, setEvents);
						reset();
					}}
					onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
						if (isDoubleClick) {
							closePopover();
						} else {
							openPopover();
						}
					}}
					renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
