import { useState } from 'react';
import { Box, Button, Group, Title } from '@mantine/core';
import dayjs from 'dayjs';

import { Header } from '~/features';
import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { HandleSubmitArgs } from '@/types';
import { exampleSubmitHandler } from '@/utils';
import { useGetFilteredEvents } from '@/hooks';
import { CalendarWrapper, PageWrapper } from '@/layout';
import { ContextMenu, FormPopover, ViewPopover, FilterControl } from '@/components';

import initialEvents from '@/data/events.json';
import groups from '@/data/groups.json';

const formFields = {
	id: 'id',
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
	multiGroup: false,
};

export function KitchenSink() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(initialEvents);
	const [inactiveGroups, setInactiveGroups] = useState<string[]>([]);
	const [popoverType, setPopoverType] = useState<'view' | 'edit' | 'create' | 'reschedule'>('view');

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Aug-2024' });

	// Filter events
	const filteredEvents = useGetFilteredEvents({ data: events, inactiveGroups });

	// Submit handler
	const handleSubmit = (args: HandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<PageWrapper>
			<Title mb='sm'>All features</Title>
			<Group mb='lg' justify='space-between'>
				<Group>
					<Button color='pink' size='xs' onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>
						Prev month
					</Button>
					<Button color='pink' size='xs' onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>
						Next month
					</Button>
					<Button color='indigo' size='xs' onClick={() => calendar.setActiveDate(dayjs())}>
						Today
					</Button>
					<Button color='orange' size='xs' onClick={() => calendar.setActiveDate(dayjs('01-01-2023'))}>
						January 2023
					</Button>
					<Button color='grape' size='xs' onClick={() => calendar.setActiveDate(dayjs().add(4, 'M'))}>
						4 months from now
					</Button>
				</Group>
				<Group>
					<Button
						size='xs'
						color='teal'
						onClick={() => {
							if (calendar.view === 'month') calendar.setView('week');
							if (calendar.view === 'week') calendar.setView('day');
							if (calendar.view === 'day') calendar.setView('month');
						}}
					>
						Toggle calendar view
					</Button>
				</Group>
			</Group>
			<CalendarWrapper>
				<Header
					{...calendar}
					customControls={
						<FilterControl
							filterLabel={formFields.group}
							items={groups}
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
									groups={groups}
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
