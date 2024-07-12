export function convertStringToDate(str: string | null) {
  if (!str) return { hour: 0, minute: 0 };
  const pmOffset = str.slice(-2) === 'pm' ? 12 : 0;
  const [hour, minute] = str.slice(0, -2).split(':');
  const parsedHour = hour === '12' ? (pmOffset ? 12 : 0) : Number(hour) + pmOffset;
  return { hour: Number(parsedHour), minute: Number(minute) };
}
