import { Dispatch, SetStateAction } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { Button } from '@mantine/core';
import dayjs from 'dayjs';

import { FormCardReturnValues, FormCardValues } from '../../types';
import { IconClock, IconClockOff } from '@tabler/icons-react';

interface TimeToggleProps {
  form: UseFormReturnType<FormCardValues, (values: FormCardValues) => FormCardReturnValues>;
  setHasTime: Dispatch<SetStateAction<boolean>>;
  hasTime: boolean;
}
export function TimeToggle({ form, setHasTime, hasTime }: TimeToggleProps) {
  // Handlers
  const handleTimeToggleClick = () => {
    const startHourInt = hasTime ? 0 : 9;
    const endHourInt = hasTime ? 0 : 10;
    const startHourVal = hasTime ? null : '9:00am';
    const endHourVal = hasTime ? null : '10:00am';

    form.setValues({
      start: dayjs(form.values.start).hour(startHourInt).minute(0).toDate(),
      end: dayjs(form.values.end).hour(endHourInt).minute(0).toDate(),
      startTime: startHourVal,
      endTime: endHourVal,
    });
    setHasTime((prev) => !prev);
  };

  // if (CONFIG.isMonthOnly) return;
  return (
    <div>
      <Button
        onClick={handleTimeToggleClick}
        leftSection={hasTime ? <IconClockOff size="0.75rem" /> : <IconClock size="0.75rem" />}
        size="compact-xs"
        variant="default"
        px="0.5rem"
        fw={400}
        fz="0.675rem"
        styles={{ section: { marginRight: '0.375rem' }, label: { paddingTop: 1 } }}
      >
        {hasTime ? 'Remove time' : 'Add time'}
      </Button>
    </div>
  );
}
