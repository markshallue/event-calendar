import { Button, Group, Paper, Title } from '@mantine/core';
import dayjs from 'dayjs';

import { EventsCalendar } from '~/EventsCalendar';
import { useEventsCalendar } from '~/hooks';

import { PageWrapper } from '@/layout/PageWrapper';
import { useBuildDemoData } from '@/data/hooks/useBuildDemoData';
import { ContextMenu, FormCard, InfoCard } from '@/components';

export function KitchenSink() {
	const { calendarData, groups } = useBuildDemoData();

	const formFields = {
		id: 'id',
		start: 'start',
		end: 'end',
		group: 'Status',
		info: 'Description',
	};

	// Get calendar instance
	const options = {};
	const calendar = useEventsCalendar(options);

	const handleSubmit = (args: unknown) => {
		console.log(args);
	};

	return (
		<PageWrapper>
			<Title mb='sm'>All features</Title>
			<Group mb='sm'>
				<Button onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>Prev month</Button>
				<Button onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>Next month</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs())}>Today</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs('01-01-2023'))}>January 2023</Button>
				<Button onClick={() => calendar.setActiveDate(dayjs().add(4, 'M'))}>4 months from now</Button>
			</Group>
			<Paper withBorder radius='md' shadow='lg'>
				<EventsCalendar
					enableDragCreation
					enableDragNDrop
					views={['month', 'week', 'day']}
					calendar={calendar}
					events={calendarData}
					renderViewPopover={props => <InfoCard {...props} editable handleSubmit={handleSubmit} />}
					renderEditPopover={props => (
						<FormCard {...props} groups={groups} fields={formFields} handleSubmit={handleSubmit} />
					)}
					renderCreatePopover={props => (
						<FormCard {...props} groups={groups} fields={formFields} handleSubmit={handleSubmit} />
					)}
					renderContextMenu={props => <ContextMenu {...props} handleSubmit={handleSubmit} />}
				/>
			</Paper>
		</PageWrapper>
	);
}
