import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Navbar } from './Navbar';

export function AppWrapper({ children }: React.PropsWithChildren) {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell header={{ height: 60 }} navbar={{ width: 260, breakpoint: 'sm', collapsed: { mobile: !opened } }}>
			<AppShell.Header>
				<Group h='100%' px='md'>
					<Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
					<Title order={2}>Events Calendar</Title>
				</Group>
			</AppShell.Header>
			<AppShell.Navbar>
				<Navbar />
			</AppShell.Navbar>
			<AppShell.Main display='grid'>{children}</AppShell.Main>
		</AppShell>
	);
}
