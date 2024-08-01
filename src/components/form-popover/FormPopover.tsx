import { Button, Card, Group, Text, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import classes from './FormPopover.module.css';

import { CalendarEvent } from '~/types';

import { DateTimeLabel } from '@/components';
import { HandleSubmitArgs, CalendarFormFields, CalendarGroup } from '@/types';

import { validateValues, getInitialValues, handleTransformValues } from './utils';
import { GroupInput, TimeToggle, DateTimeInputs } from './components';
import { humanize } from '@/utils';

interface FormPopoverProps {
	onClose: () => void;
	event: CalendarEvent | null;
	fields: CalendarFormFields;
	formType: 'edit' | 'create';
	groups?: CalendarGroup[];
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

	// Submit handler
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

			{/* Title */}
			<TextInput
				autoFocus
				label='Title'
				placeholder='Enter title'
				required
				size='xs'
				style={{ flexGrow: 1 }}
				{...form.getInputProps('title')}
			/>

			{/* Time input */}
			<DateTimeInputs fields={fields} lengthInDays={lengthInDays} form={form} hasTime={hasTime} />
			<TimeToggle form={form} setHasTime={setHasTime} hasTime={hasTime} />

			{/* Group input */}
			{groups && <GroupInput groups={groups} fields={fields} form={form} />}

			{/* Info field (e.g. description) */}
			{fields.info && (
				<Textarea
					autosize
					label={humanize(fields.info)}
					minRows={3}
					placeholder={`Enter ${fields.info}`}
					size='xs'
					{...form.getInputProps('info')}
				/>
			)}

			{/* Toolbar */}
			<Group justify='flex-end' gap='sm' mt='sm'>
				<Button onClick={onClose} radius='sm' size='xs' variant='default'>
					Cancel
				</Button>
				<Button onClick={onSubmit} radius='sm' size='xs' type='submit'>
					Save
				</Button>
			</Group>
		</Card>
	);
}
