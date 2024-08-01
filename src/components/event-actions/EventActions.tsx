import { Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

import { CalendarEvent } from '~/types';

import { HandleSubmitArgs } from '@/types';
import { ActionButton, ConfirmationModal, IconLink } from './components';

interface EventActionsProps {
	event: CalendarEvent;
	onClose: () => void;
	openPopover?: () => void;
	closeContextMenu?: () => void;
	setPopoverType?: (type: 'view' | 'edit') => void;
	handleSubmit?: (args: HandleSubmitArgs) => void;
	type: 'links' | 'icons' | 'buttons';
	withEditLink?: boolean;
	withViewLink?: boolean;
}
export function EventActions({
	event,
	handleSubmit = () => null,
	setPopoverType,
	openPopover = () => null,
	onClose = () => null,
	closeContextMenu = () => null,
	type,
	withEditLink = true,
	withViewLink = true,
}: EventActionsProps) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			{type === 'links' ? (
				<>
					<Group wrap='nowrap' gap='0.25rem' justify='flex-end' style={{ flexGrow: 1 }}>
						{withViewLink && (
							<IconLink
								label='View entry'
								color='green'
								link={`/entries/entry?EID=${event.entryId}`}
								icon={<IconEye size='1.125rem' />}
							/>
						)}
						{withEditLink && (
							<IconLink
								label='Edit entry'
								color='blue'
								link={`/entries/edit?EID=${event.entryId}`}
								icon={<IconEdit size='1.125rem' />}
							/>
						)}
					</Group>
				</>
			) : (
				<>
					{setPopoverType && (
						<ActionButton
							buttonContext={type}
							color='indigo'
							icon={<IconEdit size='1.125rem' />}
							label='Edit'
							onClick={() => {
								setPopoverType('edit');
								openPopover();
								closeContextMenu();
							}}
						/>
					)}
					<ConfirmationModal
						title='Confirm delete'
						body='Are you sure you want to delete this entry?'
						opened={opened}
						onClose={close}
						triggerButton={
							<ActionButton
								onClick={open}
								buttonContext={type}
								color='red'
								icon={<IconTrash size='1.125rem' />}
								label='Delete event'
							/>
						}
						cancelButton={
							<Button
								size='xs'
								color='gray'
								variant='default'
								onClick={e => {
									e.stopPropagation();
									onClose();
									closeContextMenu();
									close();
								}}
							>
								Cancel
							</Button>
						}
						confirmButton={
							<Button
								size='xs'
								color='red'
								onClick={e => {
									e.stopPropagation();
									onClose();
									closeContextMenu();
									close();
									handleSubmit({ id: event.id, type: 'delete' });
								}}
							>
								Delete
							</Button>
						}
					/>
				</>
			)}
		</>
	);
}
