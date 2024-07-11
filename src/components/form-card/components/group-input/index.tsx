import { CalendarGroup, CalendarFields, FormCardReturnValues, FormCardValues } from '../../types';
import { GroupMultiSelect } from './GroupMultiSelect';
import { UseFormReturnType } from '@mantine/form';
import { GroupSelect } from './GroupSelect';

interface GroupInputProps {
  disabled?: boolean;
  groups: CalendarGroup[];
  fields: CalendarFields;
  form: UseFormReturnType<FormCardValues, (values: FormCardValues) => FormCardReturnValues>;
}

export function GroupInput({ groups, fields, form }: GroupInputProps) {
  if (!groups || groups.length === 0 || !fields.group) return;
  return (
    <>
      {fields.multiGroup ? (
        <GroupMultiSelect
          error={form.errors.group}
          groups={groups}
          label={fields.group}
          handleItemSelect={(item: string) =>
            form.setFieldValue(
              'group',
              form.values.group.includes(item)
                ? form.values.group.filter((i) => i !== item)
                : [...form.values.group, item]
            )
          }
          handleItemRemove={(item: string) =>
            form.setFieldValue(
              'group',
              form.values.group.filter((i) => i !== item)
            )
          }
          value={form.values.group}
        />
      ) : (
        <GroupSelect
          error={form.errors.group}
          groups={groups}
          label={fields.group}
          onChange={(groupsArray: string[]) => form.setFieldValue('group', groupsArray)}
          value={form.values.group}
        />
      )}
    </>
  );
}
