import { useState } from 'react';
import { Paper, Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { ContextMenu, FormPopover, ViewPopover } from '@/components';

import { PageWrapper } from '@/layout/PageWrapper';

import { demoData } from '@/data/constants/demoData';
import { demoGroups } from '@/data/constants/demoGroups';
import { exampleSubmitHandler, HandleSubmitArgs } from '@/utils/exampleSubmitHandler';

export function Editable() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);
	const [popoverType, setPopoverType] = useState<'create' | 'view' | 'edit'>('view');

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
			<Title mb='sm'>Edit and delete events</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar
					calendar={calendar}
					events={events}
					onEventClick={({ openPopover }) => {
						openPopover();
						setPopoverType('view');
					}}
					onEventCreate={({ openPopover }) => {
						openPopover();
						setPopoverType('create');
					}}
					onEventReschedule={({ openPopover }) => {
						openPopover();
						setPopoverType('edit');
					}}
					renderPopover={({ event, onClose }) => {
						return popoverType === 'view' ? (
							<ViewPopover
								event={event}
								onClose={onClose}
								setPopoverType={setPopoverType}
								editable
								handleSubmit={handleSubmit}
							/>
						) : (
							<FormPopover
								event={event}
								onClose={onClose}
								groups={demoGroups}
								fields={formFields}
								handleSubmit={handleSubmit}
								formType={popoverType}
							/>
						);
					}}
					renderContextMenu={props => <ContextMenu {...props} setPopoverType={setPopoverType} handleSubmit={handleSubmit} />}
				/>
			</Paper>
		</PageWrapper>
	);
}
