import { Title } from '@mantine/core';

import { CalendarFormFields, HandleSubmitArgs } from '@/types';
import { CalendarWrapper, PageWrapper } from '@/layout';
import { demoData, demoGroups } from '@/data/constants';

import { FullCalendar } from '../../ess';
import { ActionButton } from '@/components/event-actions/components';
import { IconClipboardList, IconEye } from '@tabler/icons-react';

const formFields: CalendarFormFields = {
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
	multiGroup: false,
};

const withViewLink = false;
const withEditLink = false;

export function FullCalendarExample() {
	const handleSubmit = (args: HandleSubmitArgs) => {
		if (args.type !== 'delete') console.log(args.values);
	};
	return (
		<PageWrapper>
			<Title mb='sm'>Full Calendar</Title>
			<CalendarWrapper>
				<FullCalendar
					editable
					// compact
					// enableDragCreation
					// enableRescheduling
					// isFetching
					// views = ['month', 'week', 'day'],
					withViewLink={withViewLink}
					withEditLink={withEditLink}
					renderCustomEditControls={(event, type, close) => (
						<>
							<ActionButton
								buttonContext={type}
								color='teal'
								icon={<IconEye size='1.125rem' />}
								label='View full entry'
								onClick={() => {
									console.log(event);
									close();
								}}
							/>
							<ActionButton
								buttonContext={type}
								color='dark'
								icon={<IconClipboardList size='1.125rem' />}
								label='Edit full entry'
								onClick={() => {
									console.log(event);
									close();
								}}
							/>
						</>
					)}
					handleSubmit={handleSubmit}
					// useEventsCalendarProps={{ initialView: 'week' }}
					events={demoData}
					groups={demoGroups}
					fields={formFields}
				/>
			</CalendarWrapper>
		</PageWrapper>
	);
}
