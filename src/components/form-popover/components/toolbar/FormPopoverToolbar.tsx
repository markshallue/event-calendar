import { Button, Flex } from '@mantine/core';

interface ToolbarProps {
	onClose: () => void;
	onSubmit: () => void;
}

export function FormPopoverToolbar({ onClose, onSubmit }: ToolbarProps) {
	return (
		<Flex align='center' justify='flex-end' gap='sm' mt='sm'>
			<Button onClick={onClose} radius='sm' size='xs' variant='default'>
				Cancel
			</Button>
			<Button onClick={onSubmit} radius='sm' size='xs' type='submit'>
				Save
			</Button>
		</Flex>
	);
}
