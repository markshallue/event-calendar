import dayjs from 'dayjs';
import { useState } from 'react';
import { CalendarView } from '../types';
import { EventsCalendarObject } from './useEventsCalendar';

export function useInitEventsCalendar(calendar?: EventsCalendarObject): EventsCalendarObject {
  const [activeDate, setActiveDate] = useState(dayjs());
  const [view, setView] = useState<CalendarView>('month');

  return (
    calendar || {
      activeDate,
      setActiveDate,
      view,
      setView,
    }
  );
}
