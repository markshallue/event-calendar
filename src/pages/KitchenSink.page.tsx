import { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Button, Group, Title } from '@mantine/core';

import { Header } from '~/features';
import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { HandleSubmitArgs } from '@/types';
import { exampleSubmitHandler } from '@/utils';
import { useGetFilteredEvents } from '@/hooks';
import { CalendarWrapper, PageWrapper } from '@/layout';
import { ContextMenu, FormPopover, ViewPopover, FilterControl } from '@/components';

import { demoData, demoGroups } from '@/data/constants';

const formFields = {
	id: 'id',
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
};

export function KitchenSink() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);
	const [inactiveGroups, setInactiveGroups] = useState<string[]>([]);
	const [popoverType, setPopoverType] = useState<'view' | 'edit' | 'create' | 'reschedule'>('view');

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024' });

	// Filter events
	const filteredEvents = useGetFilteredEvents({ data: events, inactiveGroups });

	// Submit handler
	const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<PageWrapper>
			<Title mb='sm'>All features</Title>
			<Group mb='sm'>
				<Button onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>Prev month</Button>
				<Button onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>Next month</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs())}>Today</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs('01-01-2023'))}>January 2023</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs().add(4, 'M'))}>4 months from now</Button>
			</Group>
			<Group mb='sm'>
				<Button onClick={() => calendar.setView('week')}>Week view</Button>
			</Group>
			<CalendarWrapper>
				<Header
					{...calendar}
					customControls={
						<FilterControl
							filterLabel={formFields.group}
							items={demoGroups}
							hiddenItems={inactiveGroups}
							setHiddenItems={setInactiveGroups}
						/>
					}
				/>
				<Box h={`calc(100% - 52px)`}>
					<EventsCalendar
						enableDragCreation
						enableRescheduling
						noHeader
						calendar={calendar}
						events={filteredEvents}
						onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
							if (isDoubleClick) {
								closePopover();
							} else {
								openPopover();
								setPopoverType('view');
							}
						}}
						onEventCreate={({ openPopover }) => {
							openPopover();
							setPopoverType('create');
						}}
						onEventReschedule={({ openPopover }) => {
							openPopover();
							setPopoverType('reschedule');
						}}
						renderPopover={({ clickedEvent, newEvent, onClose }) => {
							return popoverType === 'view' ? (
								<ViewPopover
									editable
									event={clickedEvent}
									onClose={onClose}
									setPopoverType={setPopoverType}
									handleSubmit={handleSubmit}
								/>
							) : (
								<FormPopover
									event={popoverType === 'edit' ? clickedEvent : newEvent}
									onClose={onClose}
									groups={demoGroups}
									fields={formFields}
									handleSubmit={handleSubmit}
									formType={popoverType === 'reschedule' ? 'edit' : popoverType}
								/>
							);
						}}
						renderContextMenu={({ event, onClose, openPopover, closeContextMenu }) => (
							<ContextMenu
								event={event}
								onClose={onClose}
								openPopover={openPopover}
								closeContextMenu={closeContextMenu}
								setPopoverType={setPopoverType}
								handleSubmit={handleSubmit}
							/>
						)}
					/>
				</Box>
			</CalendarWrapper>
		</PageWrapper>
	);
}
