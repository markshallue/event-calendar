import { Box, Group, Text } from '@mantine/core';

interface DropdownItemProps {
	label: string;
	color?: string;
}

export function DropdownItem({ label, color }: DropdownItemProps) {
	return (
		<Group gap='xs'>
			{color && <Box h='0.625rem' w='0.625rem' bg={color} style={{ borderRadius: 9999, flexShrink: 0 }}></Box>}
			<Text size='xs'>{label}</Text>
		</Group>
	);
}
