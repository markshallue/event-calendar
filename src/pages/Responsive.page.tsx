import useDemoDataRequest from '@/data/hooks/useDemoDataRequest';
import { EventsCalendar } from '~/EventsCalendar';

export function Responsive() {
	const { data: events } = useDemoDataRequest();
	return (
		<div style={{ backgroundColor: '#fff', height: 'calc(100vh - 60px)' }}>
			<EventsCalendar events={events} />
		</div>
	);
}
