import { Dayjs } from 'dayjs';

export function getTimeDiff(dt1: Dayjs, dt2: Dayjs) {
  const mins1 = dt1.hour() * 60 + dt1.minute();
  const mins2 = dt2.hour() * 60 + dt2.minute();
  return mins2 - mins1;
}
