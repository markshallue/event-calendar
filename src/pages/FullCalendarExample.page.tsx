import { Title } from '@mantine/core';

import { CalendarFormFields } from '@/types';
import { CalendarWrapper, PageWrapper } from '@/layout';

import events from '@/data/events.json';
import groups from '@/data/groups.json';

import { FullCalendar } from '../../full-calendar';
import { ActionButton } from '@/components/event-actions/components';
import { IconClipboardList, IconEye } from '@tabler/icons-react';

const formFields: CalendarFormFields = {
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
	multiGroup: false,
};

export function FullCalendarExample() {
	return (
		<PageWrapper>
			<Title mb='sm'>Full Calendar</Title>
			<CalendarWrapper>
				<FullCalendar
					// compact
					// enableDragCreation
					// enableRescheduling
					// isFetching
					// views = ['month', 'week', 'day'],
					// withViewLink={false}
					// withEditLink={false}
					// useEventsCalendarProps={{ initialView: 'week' }}
					editable
					renderCustomEditControls={(_, type, close) => (
						<>
							<ActionButton
								buttonContext={type}
								color='teal'
								icon={<IconEye size='1.125rem' />}
								label='View full entry'
								onClick={close}
							/>
							<ActionButton
								buttonContext={type}
								color='dark'
								icon={<IconClipboardList size='1.125rem' />}
								label='Edit full entry'
								onClick={close}
							/>
						</>
					)}
					handleSubmit={console.log}
					events={events}
					groups={groups}
					fields={formFields}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
