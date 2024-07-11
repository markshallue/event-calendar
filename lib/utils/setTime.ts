import { Dayjs } from 'dayjs';

/*
    Function that takes in a date object and a time
    Returns date object with same date, but resets time to input
*/
export function setTime(date: Dayjs, time: Dayjs) {
  return date.hour(time.hour()).minute(time.minute());
}
