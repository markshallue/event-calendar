import { NothingFound } from './NothingFound';
import { AppWrapper } from '@/layout/AppWrapper';

export function RootErrorBoundary() {
	return (
		<AppWrapper>
			<NothingFound />
		</AppWrapper>
	);
}
