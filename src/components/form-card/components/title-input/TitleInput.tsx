import { FormCardReturnValues, FormCardValues } from '../../types';
import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

interface TitleInputProps {
  form: UseFormReturnType<FormCardValues, (values: FormCardValues) => FormCardReturnValues>;
}

export function TitleInput({ form }: TitleInputProps) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexGrow: 1 }}>
      <TextInput
        autoFocus
        label="Title"
        placeholder="Enter title"
        required
        size="xs"
        style={{ flexGrow: 1 }}
        // value={event.title}
        {...form.getInputProps('title')}
      />
    </div>
  );
}
