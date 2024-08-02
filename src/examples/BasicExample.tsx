import { EventsCalendar } from '~/EventsCalendar';
import events from '@/data/events.json';

export function BasicExample() {
	return <EventsCalendar events={events} />;
}
