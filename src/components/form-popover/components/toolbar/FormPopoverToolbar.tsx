import { Button, Flex } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { CalendarEvent } from '~/types';
import { FormPopoverReturnValues, FormPopoverValues } from '../../types';
import { HandleSubmitArgs } from '@/utils/exampleSubmitHandler';

interface ToolbarProps {
	onClose: () => void;
	formType: 'edit' | 'create';
	event: CalendarEvent;
	handleSubmit: (args: HandleSubmitArgs) => void;
	form: UseFormReturnType<FormPopoverValues, (values: FormPopoverValues) => FormPopoverReturnValues>;
}

export function FormPopoverToolbar({ onClose, formType, event, form, handleSubmit }: ToolbarProps) {
	const handleClick = () => {
		const validation = form.validate();
		const eventId = event.id || event.dragId;
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
