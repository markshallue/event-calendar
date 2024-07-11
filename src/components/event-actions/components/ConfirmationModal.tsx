import { Group, Modal, ModalProps, Text } from '@mantine/core';
import { ReactNode } from 'react';

interface ConfirmationModalProps extends ModalProps {
  body: string;
  confirmButton: ReactNode;
  cancelButton: ReactNode;
  triggerButton: ReactNode;
}

export function ConfirmationModal({
  opened,
  onClose,
  title,
  body,
  triggerButton,
  confirmButton,
  cancelButton,
}: ConfirmationModalProps) {
  return (
    <>
      <Modal opened={opened} onClose={onClose} title={title} withinPortal zIndex={501} centered>
        <Text size="sm">{body}</Text>
        <Group gap="sm" mt="lg" justify="flex-end">
          {cancelButton}
          {confirmButton}
        </Group>
      </Modal>

      {triggerButton}
    </>
  );
}
