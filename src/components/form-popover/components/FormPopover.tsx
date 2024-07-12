import { Card, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import classes from './FormPopover.module.css';

import { CalendarGroup, HandleSubmitArgs } from '../types';

import { validateValues } from '../utils/validateValues';
import { getInitialValues } from '../utils/getInitialValues';
import { handleTransformValues } from '../utils/handleTransformValues';

import { FormPopoverToolbar } from './toolbar/FormPopoverToolbar';
import { InfoInput } from './info-input/InfoInput';
import { DateTimeInputs } from './date-time-inputs/DateTimeInputs';
import { GroupInput } from './group-input';
import { TitleInput } from './title-input/TitleInput';
import { TimeToggle } from './time-toggle/TimeToggle';
import { CalendarEvent, EventsCalendarPopoverProps, PopoverDisplayType } from '~/types';
import { DateTimeLabel } from '@/components/date-time-label';

interface FormPopoverProps extends EventsCalendarPopoverProps {
	fields: {
		end: string;
		group: string;
		info: string;
	};
	formType: PopoverDisplayType;
	event: CalendarEvent;
	groups: CalendarGroup[];
	handleSubmit: (args: HandleSubmitArgs) => void;
}

export function FormPopover({ fields, formType, onClose, groups, handleSubmit, event }: FormPopoverProps) {
	const lengthInDays = event.end.diff(event.start, 'd') + 1;

	// const [hasTime, setHasTime] = useState(!CONFIG.isMonthOnly && !event.isAllDay);
	const [hasTime, setHasTime] = useState(!event.isAllDay);

	const form = useForm({
		initialValues: getInitialValues(event),
		transformValues: values => handleTransformValues(values, fields),
		validateInputOnChange: true,
		validate: validateValues(fields),
	});

	// useHotkeys([['Enter', form.onSubmit(values => console.log(values))]]);

	return (
		<Card className={classes.FormPopover} withBorder>
			<div>
				<Text fw={600}>{formType === 'create' ? 'New event' : 'Edit event'}</Text>
				<DateTimeLabel event={event} />
			</div>
			<TitleInput form={form} />
			<DateTimeInputs fields={fields} lengthInDays={lengthInDays} form={form} hasTime={hasTime} />
			<TimeToggle form={form} setHasTime={setHasTime} hasTime={hasTime} />
			<GroupInput groups={groups} fields={fields} form={form} />
			<InfoInput fields={fields} form={form} />
			<FormPopoverToolbar onClose={onClose} event={event} form={form} formType={formType} handleSubmit={handleSubmit} />
		</Card>
	);
}
