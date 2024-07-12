import { Button, Flex } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { CalendarEvent } from '~/types';
import { FormCardReturnValues, FormCardValues, HandleSubmitArgs } from '../../types';

interface ToolbarProps {
	onClose: () => void;
	formType: 'edit' | 'create';
	event: CalendarEvent;
	handleSubmit: (args: HandleSubmitArgs) => void;
	form: UseFormReturnType<FormCardValues, (values: FormCardValues) => FormCardReturnValues>;
}

export function FormCardToolbar({ onClose, formType, event, form, handleSubmit }: ToolbarProps) {
	const handleClick = () => {
		const validation = form.validate();
		const eventId = event.id || event.dragId;
		console.log(event);
		console.log(eventId);
		if (!validation.hasErrors && eventId !== undefined) {
			handleSubmit({
				id: eventId,
				type: formType,
				values: form.getTransformedValues(),
			});
			onClose();
		}
	};

	return (
		<Flex align='center' justify='flex-end' gap='sm' mt='sm'>
			<Button onClick={onClose} radius='sm' size='xs' variant='default'>
				Cancel
			</Button>
			<Button onClick={handleClick} radius='sm' size='xs' type='submit'>
				Save
			</Button>
		</Flex>
	);
}
