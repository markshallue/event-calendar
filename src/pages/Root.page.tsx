import { Outlet } from 'react-router-dom';
import { AppWrapper } from '../layout/AppWrapper';

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/carousel/styles.layer.css';

export function Root() {
	return (
		<AppWrapper>
			<Outlet />
		</AppWrapper>
	);
}
