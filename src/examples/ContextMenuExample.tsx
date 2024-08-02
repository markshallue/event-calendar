import { useState } from 'react';
import { EventsCalendar } from '~/EventsCalendar';
import { RawCalendarEvent } from '~/types';

import { ContextMenu, FormPopover, ViewPopover } from '@/components';
import { ExampleHandleSubmitArgs, exampleSubmitHandler } from '@/utils';

import groups from '@/data/groups.json';
import fields from '@/data/formFields.json';
import initialEvents from '@/data/events.json';

export function ContextMenuExample() {
	const [events, setEvents] = useState<RawCalendarEvent[]>(initialEvents);
	const [popoverType, setPopoverType] = useState<'view' | 'edit' | 'create' | 'reschedule'>('view');

	const handleSubmit = (args: ExampleHandleSubmitArgs) => exampleSubmitHandler(args, events, setEvents);

	return (
		<EventsCalendar
			events={events}
			onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
				if (isDoubleClick) {
					closePopover();
				} else {
					openPopover();
				}
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
						fields={fields}
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
	);
}
