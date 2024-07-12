import { Center, Text } from '@mantine/core';

export function ErrorFallback() {
	return (
		<Center>
			<Text size='lg' fw={700}>
				Error: Something went wrong
			</Text>
		</Center>
	);
}
