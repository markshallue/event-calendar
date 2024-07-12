import { Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { CalendarFields, FormPopoverReturnValues, FormPopoverValues } from '../../types';
import { humanize } from '~/utils/functions';

interface InfoInputProps {
	fields: CalendarFields;
	form: UseFormReturnType<FormPopoverValues, (values: FormPopoverValues) => FormPopoverReturnValues>;
}

export function InfoInput({ fields, form }: InfoInputProps) {
	if (!fields.info) return <></>;
	return (
		<Textarea
			autosize
			label={humanize(fields.info)}
			minRows={3}
			placeholder='Click to edit this field'
			size='xs'
			{...form.getInputProps('info')}
		/>
	);
}
