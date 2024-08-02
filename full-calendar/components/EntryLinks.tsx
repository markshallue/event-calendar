import { Group } from '@mantine/core';
import { IconEdit, IconEye } from '@tabler/icons-react';

import { EntryLink } from './EntryLink';

interface Props {
	withViewLink: boolean;
	withEditLink: boolean;
	id: unknown;
	type: 'icon' | 'button';
}

export function EntryLinks({ withViewLink, withEditLink, type, id }: Props) {
	const links = (
		<>
			{withViewLink && (
				<EntryLink
					type={type}
					label='View entry'
					color='teal'
					link={`/entries/entry?EID=${id}`}
					icon={<IconEye size='1.125rem' />}
				/>
			)}
			{withEditLink && (
				<EntryLink
					type={type}
					label='Edit entry'
					color='blue'
					link={`/entries/edit?EID=${id}`}
					icon={<IconEdit size='1.125rem' />}
				/>
			)}
		</>
	);

	return type === 'button' ? (
		links
	) : (
		<Group wrap='nowrap' gap='0.25rem' justify='flex-end' style={{ flexGrow: 1 }}>
			{links}
		</Group>
	);
}
