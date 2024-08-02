import { Dispatch, SetStateAction } from 'react';

import { CalendarEvent, RawCalendarEvent } from '~/types';

import { demoGroups } from '@/data/constants/demoGroups';
import { createNewEventFromForm } from './createNewEventFromForm';
import { FormPopoverReturnValues } from '@/components/form-popover/types';

export type ExampleHandleSubmitArgs =
	| {
			type: 'delete';
			id: number | null;
	  }
	| {
			id: number | null;
			type: 'create' | 'edit';
			values: FormPopoverReturnValues;
	  }
	| {
			id: number | null;
			type: 'reschedule';
			event: CalendarEvent;
	  };

export const exampleSubmitHandler = (
	args: ExampleHandleSubmitArgs,
	events: RawCalendarEvent[],
	setEvents: Dispatch<SetStateAction<RawCalendarEvent[]>>
) => {
	const { type } = args;
	if (type === 'delete') {
		setEvents(p => p.filter(event => event.id !== args.id));
	}
	if (type === 'create') {
		const newId = Math.max(...events.map(e => e.id ?? 0)) + 1;
		const newEvent = createNewEventFromForm({ type, values: args.values, groups: demoGroups, id: newId });
		setEvents(p => [...p, newEvent]);
	}
	if (type === 'reschedule') {
		const newEvents = events.map(event => {
			if (event.id !== args.id) return event;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { dragId, isActive, indent, order, ...props } = args.event;
			return { ...props, id: dragId };
		});
		setEvents(newEvents);
	}
	if (type === 'edit') {
		const newEvents = events.map(event => {
			if (event.id !== args.id) return event;
			return createNewEventFromForm({ type, values: args.values, groups: demoGroups, event: event });
		});
		setEvents(newEvents);
	}
};
