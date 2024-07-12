import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';

export default function App() {
	return (
		<MantineProvider theme={theme}>
			<Router />
		</MantineProvider>
	);
}
