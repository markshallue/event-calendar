import { Paper, Title } from '@mantine/core';

import { EventsCalendar } from '~/EventsCalendar';

import { ViewPopover } from '@/components';
import { PageWrapper } from '@/layout/PageWrapper';
import useDemoDataRequest from '@/data/hooks/useDemoDataRequest';
import { useEventsCalendar } from '~/hooks';

export function CustomHeader() {
	const { data: events } = useDemoDataRequest();

	const calendar = useEventsCalendar({});

	const customHeader = (
		<div
			style={{
				padding: '0.75rem 1rem',
				borderBottom: '1px solid red',
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
				<button onClick={() => calendar.setActiveDate(p => p.subtract(1, 'month'))}>Previous month</button>
				<button onClick={() => calendar.setActiveDate(p => p.add(1, 'month'))}>Next month</button>
			</div>
			<span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'tomato' }}>
				{calendar.activeDate.format('MMMM YYYY')}
			</span>
		</div>
	);

	return (
		<PageWrapper>
			<Title mb='sm'>Custom header element</Title>
			<Paper withBorder radius='md' shadow='lg'>
				{customHeader}
				<EventsCalendar noHeader calendar={calendar} events={events} renderPopover={props => <ViewPopover {...props} />} />
			</Paper>
		</PageWrapper>
	);
}
