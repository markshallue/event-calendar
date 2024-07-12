import { CalendarGroup, CalendarFields, FormPopoverReturnValues, FormPopoverValues } from '../../types';
import { GroupMultiSelect } from './GroupMultiSelect';
import { UseFormReturnType } from '@mantine/form';
import { GroupSelect } from './GroupSelect';

interface GroupInputProps {
	disabled?: boolean;
	groups: CalendarGroup[];
	fields: CalendarFields;
	form: UseFormReturnType<FormPopoverValues, (values: FormPopoverValues) => FormPopoverReturnValues>;
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
							'groups',
							form.values.groups.includes(item) ? form.values.groups.filter(i => i !== item) : [...form.values.groups, item]
						)
					}
					handleItemRemove={(item: string) =>
						form.setFieldValue(
							'groups',
							form.values.groups.filter(i => i !== item)
						)
					}
					value={form.values.groups}
				/>
			) : (
				<GroupSelect
					error={form.errors.groups}
					groups={groups}
					label={fields.group}
					onChange={(groupsArray: string[]) => form.setFieldValue('groups', groupsArray)}
					value={form.values.groups}
				/>
			)}
		</>
	);
}
