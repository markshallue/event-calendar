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
			<Paper withBorder radius='md' shadow='lg' h={550}>
				<EventsCalendar
					events={events}
					onEventClick={({ openPopover }) => openPopover()}
					renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
				/>
			</Paper>
		</PageWrapper>
	);
}
