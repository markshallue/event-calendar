import { Card, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import classes from './FormPopover.module.css';

import { CalendarEvent } from '~/types';

import { HandleSubmitArgs } from '@/utils';
import { DateTimeLabel } from '@/components';

import { CalendarGroup } from './types';
import { validateValues, getInitialValues, handleTransformValues } from './utils';
import { InfoInput, GroupInput, TitleInput, TimeToggle, FormPopoverToolbar, DateTimeInputs } from './components';

interface FormPopoverProps {
	onClose: () => void;
	event: CalendarEvent | null;
	fields: {
		end: string;
		group: string;
		info: string;
	};
	formType: 'edit' | 'create';
	groups: CalendarGroup[];
	handleSubmit: (args: HandleSubmitArgs) => void;
}

export function FormPopover({ fields, formType, onClose, groups, handleSubmit, event }: FormPopoverProps) {
	const [hasTime, setHasTime] = useState(!event?.isAllDay);

	const form = useForm({
		initialValues: getInitialValues(event),
		transformValues: values => handleTransformValues(values, fields),
		validateInputOnChange: true,
		validate: validateValues(fields),
	});

	const onSubmit = () => {
		const validation = form.validate();
		const eventId = event?.id || event?.dragId || null;
		if (!validation.hasErrors && eventId !== undefined) {
			const submitType = formType === 'create' ? 'create' : 'edit';
			handleSubmit({
				id: eventId,
				type: submitType,
				values: form.getTransformedValues(),
			});
			onClose();
		}
	};

	if (!event) return <></>;
	const lengthInDays = event.end.diff(event.start, 'd') + 1;

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
			<FormPopoverToolbar onClose={onClose} onSubmit={onSubmit} />
		</Card>
	);
}
