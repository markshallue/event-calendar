import { Select } from '@mantine/core';
import classes from './TimeSelect.module.css';

interface TimeSelectProps {
  data: string[];
  value: string | null;
  onChange: (startTime: string | null) => void;
}
export function TimeSelect({ data, value, onChange }: TimeSelectProps) {
  return (
    <Select
      data={data}
      allowDeselect={false}
      comboboxProps={{ dropdownPadding: 0, shadow: 'md', zIndex: 501 }}
      searchable
      rightSection={<></>}
      rightSectionWidth={0}
      size="xs"
      styles={{ input: { padding: '0 8px', width: 68 } }}
      value={value}
      onChange={onChange}
      withCheckIcon={false}
      classNames={{ option: classes.option }}
    />
  );
}
