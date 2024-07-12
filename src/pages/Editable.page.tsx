import { Paper, Title } from '@mantine/core';

import { EventsCalendar } from '~/EventsCalendar';
import { useEventsCalendar } from '~/hooks';

import { PageWrapper } from '@/layout/PageWrapper';
import { ContextMenu, FormPopover, ViewPopover } from '@/components';
import { demoData } from '@/data/constants/demoData';
import { demoGroups } from '@/data/constants/demoGroups';
import { useState } from 'react';
import { HandleSubmitArgs } from '@/components/form-popover/types';
import { RawCalendarEvent } from '~/types';
import { createNewEventFromForm } from '@/utils';

export function Editable() {
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

	const handleSubmit = (args: HandleSubmitArgs) => {
		if (args.type === 'delete') {
			setEvents(p => p.filter(event => event.id !== args.id));
		}
		if (args.type === 'create') {
			const newId = Math.max(...events.map(e => e.id)) + 1;
			console.log(newId);
			const newEvent = createNewEventFromForm({ type: 'create', values: args.values, groups: demoGroups, id: newId });
			setEvents(p => [...p, newEvent]);
		}
		if (args.type === 'edit') {
			const newEvents = events.map(event => {
				if (event.id !== args.id) return event;
				return createNewEventFromForm({
					type: 'edit',
					values: args.values,
					groups: demoGroups,
					event: event,
				});
			});
			setEvents(newEvents);
		}
	};

	return (
		<PageWrapper>
			<Title mb='sm'>Edit and delete events</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar
					calendar={calendar}
					events={events}
					renderPopover={props => <ViewPopover {...props} editable handleSubmit={handleSubmit} />}
					renderEditPopover={props => (
						<FormPopover {...props} groups={demoGroups} fields={formFields} handleSubmit={handleSubmit} formType='edit' />
					)}
					renderContextMenu={props => <ContextMenu {...props} handleSubmit={handleSubmit} />}
				/>
			</Paper>
		</PageWrapper>
	);
}
