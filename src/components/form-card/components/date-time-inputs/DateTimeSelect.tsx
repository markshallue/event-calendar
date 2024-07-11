import { DateValue } from '@mantine/dates';
import { DateSelect } from './DateSelect';
import { TimeSelect } from './TimeSelect';

interface DateTimeSelectProps {
  dateLabel: string;
  dateValue: DateValue;
  hasTime: boolean;
  minDate?: Date;
  onDateChange?: (value: DateValue) => void;
  onTimeChange: (startTime: string | null) => void;
  timesData: string[];
  timeValue: string | null;
}
export function DateTimeSelect({
  dateLabel,
  dateValue,
  hasTime,
  timesData,
  timeValue,
  minDate,
  onDateChange,
  onTimeChange,
}: DateTimeSelectProps) {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'end', width: '100%' }}>
      <DateSelect
        hasTime={hasTime}
        label={dateLabel}
        minDate={minDate}
        onChange={onDateChange}
        value={dateValue}
      />
      {hasTime && <TimeSelect data={timesData} value={timeValue} onChange={onTimeChange} />}
    </div>
  );
}
