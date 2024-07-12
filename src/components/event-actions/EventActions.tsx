import { Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconClipboardList, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';

import { CalendarEvent } from '~/types';

import { ActionButton, ConfirmationModal, IconLink } from './components';
import { HandleSubmitArgs } from '../form-card/types';

interface EventActionsProps {
	event: CalendarEvent;
	onClose: () => void;
	closeContextMenu?: () => void;
	setPopoverType: (type: 'view' | 'edit') => void;
	handleSubmit: (args: HandleSubmitArgs) => void;
	type: 'links' | 'icons' | 'buttons';
	withEditLink?: boolean;
	withViewLink?: boolean;
}
export function EventActions({
	event,
	handleSubmit,
	setPopoverType,
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
					<ActionButton
						buttonContext={type}
						color='dark'
						icon={<IconEye size='1.125rem' />}
						label='View event'
						onClick={() => {
							// dispatch({ type: 'view_full_event', event });
							closeContextMenu();
						}}
					/>
					<ActionButton
						buttonContext={type}
						color='indigo'
						icon={<IconEdit size='1.125rem' />}
						label='Quick edit'
						onClick={() => {
							setPopoverType('edit');
							closeContextMenu();
						}}
					/>
					<ActionButton
						buttonContext={type}
						color='green'
						icon={<IconClipboardList size='1.125rem' />}
						label='Edit full event'
						onClick={() => {
							// dispatch({ type: 'edit_full_event', event });
							closeContextMenu();
						}}
					/>
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
