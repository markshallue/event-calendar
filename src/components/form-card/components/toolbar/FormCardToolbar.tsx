import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { CalendarEvent } from '~/types';
import { FormCardReturnValues, FormCardValues } from '../../types';

interface ToolbarProps {
	onClose: () => void;
	event: CalendarEvent;
	handleSubmit: (args: any) => void;
	form: UseFormReturnType<FormCardValues, (values: FormCardValues) => FormCardReturnValues>;
}

export function FormCardToolbar({ onClose, event, form, handleSubmit }: ToolbarProps) {
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'flex-end',
				gap: '0.5rem',
				marginTop: '0.75rem',
			}}
		>
			{/* {event.id !== 0 && (
        <Button
          color="gray"
          onClick={() => dispatch({ type: 'edit_full_event', eventId: event.id })}
          radius="sm"
          rightSection={<IconExternalLink size={12} style={{ marginLeft: -6 }} />}
          size="xs"
          styles={getButtonStyles('#555')}
          variant="subtle"
        >
          Edit full event
        </Button>
      )} */}
			<Button onClick={onClose} radius='sm' size='xs' variant='default'>
				Cancel
			</Button>
			<Button
				onClick={() => {
					const validation = form.validate();
					if (!validation.hasErrors) {
						const submitType = !event.entryId ? 'create' : 'update';
						if (submitType === 'create' || form.isDirty()) {
							handleSubmit({
								entryId: event.entryId,
								type: submitType,
								values: form.getTransformedValues(),
							});
						}
						onClose();
					}
				}}
				radius='sm'
				size='xs'
				type='submit'
			>
				Save
			</Button>
		</div>
	);
}
