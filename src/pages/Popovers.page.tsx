import { Title } from '@mantine/core';

import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';
import { PageWrapper, CalendarWrapper } from '@/layout';

import { useDemoDataRequest } from '@/data/hooks';

export function Popovers() {
	const { data: events } = useDemoDataRequest();

	return (
		<PageWrapper>
			<Title mb='sm'>View popover</Title>
			<CalendarWrapper>
				<EventsCalendar
					events={events}
					onEventClick={({ openPopover, isDoubleClick, closePopover }) => {
						if (isDoubleClick) {
							closePopover();
						} else {
							openPopover();
						}
					}}
					renderPopover={({ clickedEvent, onClose }) => <ViewPopover event={clickedEvent} onClose={onClose} editable />}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
