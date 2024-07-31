import { useDemoDataRequest } from '@/data/hooks/useDemoDataRequest';
import { EventsCalendar } from '~/EventsCalendar';

export function Responsive() {
	const { data: events } = useDemoDataRequest();

	return <EventsCalendar events={events} />;
}
