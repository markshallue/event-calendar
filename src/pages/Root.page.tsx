import { Outlet } from 'react-router-dom';
import { AppWrapper } from '../layout/AppWrapper';

export function Root() {
	return (
		<AppWrapper>
			<Outlet />
		</AppWrapper>
	);
}
