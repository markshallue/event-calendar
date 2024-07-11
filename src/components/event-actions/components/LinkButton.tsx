import { Button } from '@mantine/core';
import { IconEdit, IconExternalLink } from '@tabler/icons-react';

interface LinkButtonProps {
  buttonType: 'edit' | 'view';
  entryId: number;
}
export function LinkButton({ buttonType, entryId }: LinkButtonProps) {
  const buttonProps =
    buttonType === 'edit'
      ? {
          color: 'blue',
          rightSection: <IconEdit size={14} style={{ marginLeft: -4 }} />,
          style: { color: '#228be6', textDecroation: 'none !important' },
          variant: 'outline',
        }
      : {
          rightSection: <IconExternalLink size={14} style={{ marginLeft: -4 }} />,
          style: { color: '#fff', textDecroation: 'none !important' },
        };

  const linkLocation = buttonType === 'view' ? 'entry' : 'edit';

  return (
    <Button
      component="a"
      href={`/entries/${linkLocation}?EID=${entryId}`}
      radius="sm"
      size="compact-sm"
      target="_blank"
      {...buttonProps}
    >
      {buttonType === 'edit' ? 'Edit' : 'View'}
    </Button>
  );
}
