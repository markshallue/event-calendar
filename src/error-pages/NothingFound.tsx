import { Link } from 'react-router-dom';
import { Title, Text, Button, Center, Stack } from '@mantine/core';

export function NothingFound() {
	return (
		<Stack w='100%' h='100%' justify='center' align='center'>
			<Stack maw='60rem'>
				<Title ta='center' fw={900} fz='38px'>
					Nothing to see here
				</Title>
				<Text c='dimmed' size='lg' ta='center' mt='lg' mb='xl'>
					Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
					another URL. If you think this is an error contact support.
				</Text>
				<Center>
					<Link to='/'>
						<Button size='md'>Take me back home</Button>
					</Link>
				</Center>
			</Stack>
		</Stack>
	);
}
