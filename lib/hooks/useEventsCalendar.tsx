import { Dispatch, SetStateAction, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { CalendarView } from '../types';

interface useEventsCalendarProps {
  initialDate?: string | number | Date | dayjs.Dayjs | null;
  initialView?: CalendarView;
}

export type EventsCalendarObject = {
  activeDate: Dayjs;
  setActiveDate: Dispatch<SetStateAction<Dayjs>>;
  view: CalendarView;
  setView: Dispatch<SetStateAction<CalendarView>>;
};

export function useEventsCalendar({
  initialDate,
  initialView = 'month',
}: useEventsCalendarProps): EventsCalendarObject {
  const [activeDate, setActiveDate] = useState(dayjs(initialDate));
  const [view, setView] = useState<CalendarView>(initialView);

  return {
    activeDate,
    setActiveDate,
    view,
    setView,
  };
}
