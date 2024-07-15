import { useState } from 'react';
import { Paper, Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { FormPopover } from '@/components';

import { PageWrapper } from '@/layout/PageWrapper';

import { demoData } from '@/data/constants/demoData';
import { demoGroups } from '@/data/constants/demoGroups';
import { exampleSubmitHandler, HandleSubmitArgs } from '@/utils/exampleSubmitHandler';

export function DragNDrop() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);

	const formFields = {
		id: 'id',
		start: 'start',
		end: 'end',
		group: 'Status',
		info: 'Description',
	};

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<PageWrapper>
			<Title mb='sm'>Drag-n-drop event rescheduling</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar
					enableRescheduling
					calendar={calendar}
					events={events}
					onEventReschedule={({ openPopover }) => {
						openPopover();
					}}
					renderPopover={({ event, onClose }) => (
						<FormPopover
							event={event}
							onClose={onClose}
							groups={demoGroups}
							fields={formFields}
							handleSubmit={handleSubmit}
							formType='edit'
						/>
					)}
				/>
			</Paper>
		</PageWrapper>
	);
}
