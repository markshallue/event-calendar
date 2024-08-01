import { useState } from 'react';
import { Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { PageWrapper, CalendarWrapper } from '@/layout';
import { ContextMenu, FormPopover } from '@/components';
import { demoData, demoGroups } from '@/data/constants';
import { ExampleHandleSubmitArgs, exampleSubmitHandler } from '@/utils';

const formFields = {
	id: 'id',
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
	multiGroup: false,
};

export function Editable() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	const handleSubmit = (args: ExampleHandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<PageWrapper>
			<Title mb='sm'>Edit and delete events</Title>
			<CalendarWrapper>
				<EventsCalendar
					calendar={calendar}
					events={events}
					onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
						if (isDoubleClick) {
							closePopover();
						} else {
							openPopover();
						}
					}}
					renderPopover={({ clickedEvent, onClose }) => (
						<FormPopover
							event={clickedEvent}
							onClose={onClose}
							groups={demoGroups}
							fields={formFields}
							handleSubmit={handleSubmit}
							formType={'edit'}
						/>
					)}
					renderContextMenu={({ event, onClose, openPopover, closeContextMenu }) => (
						<ContextMenu
							event={event}
							onClose={onClose}
							openPopover={openPopover}
							closeContextMenu={closeContextMenu}
							setPopoverType={() => null}
							handleSubmit={handleSubmit}
						/>
					)}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
