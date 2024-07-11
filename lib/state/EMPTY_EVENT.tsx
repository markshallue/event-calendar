import dayjs from 'dayjs';
import { PlaceholderEvent } from '../types';

export const EMPTY_EVENT: PlaceholderEvent = {
  id: 0,
  entryId: null,
  title: 'Untitled',
  info: '',
  groups: [{ label: '', color: '#0ea5e9' }],
  filter: [],
  start: dayjs(),
  end: dayjs(),
  startTime: undefined,
  endTime: undefined,
  isActive: false,
  isAllDay: true,
  content: [],
  images: [],
  indent: 0,
  order: 0,
};
