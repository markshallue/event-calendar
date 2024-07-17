import { useState } from 'react';
import dayjs from 'dayjs';
import { Button, Group, Paper, Title } from '@mantine/core';

import { RawCalendarEvent } from '~/types';
import { useEventsCalendar } from '~/hooks';
import { EventsCalendar } from '~/EventsCalendar';

import { ContextMenu, FormPopover, ViewPopover } from '@/components';

import { PageWrapper } from '@/layout/PageWrapper';

import { demoData } from '@/data/constants/demoData';
import { demoGroups } from '@/data/constants/demoGroups';
import { exampleSubmitHandler, HandleSubmitArgs } from '@/utils/exampleSubmitHandler';

const formFields = {
	id: 'id',
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
};

export function KitchenSink() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(demoData);
	const [popoverType, setPopoverType] = useState<'view' | 'edit' | 'create' | 'reschedule'>('view');

	// Get calendar instance
	const calendar = useEventsCalendar({ initialDate: '01-Jul-2024', closeOnClickOutside: false });

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
				<Button onClick={() => calendar.dispatch({ type: 'reset_calendar' })}>Reset</Button>
			</Group>
			<Paper withBorder radius='md' shadow='lg' h={550}>
				<EventsCalendar
					enableDragCreation
					enableRescheduling
					calendar={calendar}
					events={events}
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
								event={clickedEvent}
								onClose={onClose}
								setPopoverType={setPopoverType}
								editable
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
				></EventsCalendar>
			</Paper>
		</PageWrapper>
	);
}
