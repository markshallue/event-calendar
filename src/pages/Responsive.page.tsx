import useDemoDataRequest from '@/data/hooks/useDemoDataRequest';
import { EventsCalendar } from '~/EventsCalendar';

export function Responsive() {
	const { data: events } = useDemoDataRequest();
	return (
		<div style={{ backgroundColor: '#fff', height: '100%' }}>
			<EventsCalendar events={events} />
		</div>
	);
}
