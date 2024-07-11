import { DateInput, DateValue } from '@mantine/dates';

interface DateSelectProps {
  hasTime: boolean;
  label: string;
  minDate?: Date;
  onChange?: (date: DateValue) => void;
  value: DateValue;
}
export function DateSelect({ hasTime, label, minDate, onChange, value }: DateSelectProps) {
  return (
    <DateInput
      style={{ width: '100%' }}
      firstDayOfWeek={0}
      label={`${label} date`}
      minDate={minDate}
      onChange={onChange}
      placeholder={`${label} date`}
      popoverProps={{ zIndex: 501, shadow: 'md' }}
      value={value}
      valueFormat={hasTime ? 'MMM D' : 'MMMM D, YYYY'}
      rightSection={<></>}
      rightSectionWidth={0}
      size="xs"
      styles={{ input: { padding: '0 8px' } }}
    />
  );
}
