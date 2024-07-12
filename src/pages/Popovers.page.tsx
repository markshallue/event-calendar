import { Paper, Title } from '@mantine/core';

import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';
import { PageWrapper } from '@/layout/PageWrapper';
import useDemoDataRequest from '@/data/hooks/useDemoDataRequest';

export function Popovers() {
	const { data: events } = useDemoDataRequest();

	return (
		<PageWrapper>
			<Title mb='sm'>View popover</Title>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar events={events} renderPopover={props => <ViewPopover {...props} />} />
			</Paper>
		</PageWrapper>
	);
}
