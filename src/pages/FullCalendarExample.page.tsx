import { Title } from '@mantine/core';

import { HandleSubmitArgs } from '@/types';
import { CalendarWrapper, PageWrapper } from '@/layout';
import { demoData, demoGroups } from '@/data/constants';

import { FullCalendar } from '../../ess';

const formFields = {
	id: 'id',
	start: 'start',
	end: 'end',
	group: 'Status',
	info: 'Description',
	multiGroup: false,
};

export function FullCalendarExample() {
	const handleSubmit = (args: HandleSubmitArgs) => {
		console.log(args.type);
		if (args.type === 'edit') console.log(args.values);
	};
	return (
		<PageWrapper>
			<Title mb='sm'>Full Calendar</Title>
			<CalendarWrapper>
				<FullCalendar
					// compact
					// enableDragCreation
					enableRescheduling
					// isFetching
					// views = ['month', 'week', 'day'],
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
