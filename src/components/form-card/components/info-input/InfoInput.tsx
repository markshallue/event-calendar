import { Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { CalendarFields, FormCardReturnValues, FormCardValues } from '../../types';
import { humanize } from '~/utils/functions';

interface InfoInputProps {
	fields: CalendarFields;
	form: UseFormReturnType<FormCardValues, (values: FormCardValues) => FormCardReturnValues>;
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
