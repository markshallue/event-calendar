import { ActionIcon, Button, ButtonProps, Tooltip } from '@mantine/core';

interface EntryLinkProps {
	label: string;
	color: ButtonProps['color'];
	link: string;
	icon: React.ReactNode;
	type: 'button' | 'icon';
}
export function EntryLink({ label, color, link, icon: Icon, type }: EntryLinkProps) {
	return type === 'button' ? (
		<Button
			component='a'
			href={link}
			color={color}
			size='xs'
			styles={{ inner: { justifyContent: 'flex-start' } }}
			variant='subtle'
			target='_blank'
			style={{ textDecroation: 'none !important' }}
			leftSection={Icon}
		>
			{label}
		</Button>
	) : (
		<Tooltip label={label} styles={{ tooltip: { fontSize: '0.75rem', padding: '0.125rem 0.5rem' } }} zIndex={501}>
			<ActionIcon
				data-color={color}
				color={color}
				variant='subtle'
				component='a'
				target='_blank'
				rel='noreferrer'
				href={link}
			>
				{Icon}
			</ActionIcon>
		</Tooltip>
	);
}
