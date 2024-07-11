import { MouseEvent, ReactNode } from 'react';
import { ActionIcon, Button, Tooltip } from '@mantine/core';

interface ActionButtonProps {
  buttonContext: 'icons' | 'buttons';
  color: string;
  icon: ReactNode;
  label: string;
  onClick?: (e: MouseEvent) => void;
}
export function ActionButton({
  buttonContext,
  color,
  icon: Icon,
  label,
  onClick = () => null,
}: ActionButtonProps) {
  return (
    <>
      {buttonContext === 'icons' ? (
        <Tooltip
          label={label}
          styles={{ tooltip: { fontSize: '0.75rem', padding: '0.125rem 0.5rem' } }}
          zIndex={501}
        >
          <ActionIcon color={color} onClick={onClick} variant="subtle">
            {Icon}
          </ActionIcon>
        </Tooltip>
      ) : (
        <Button
          color={color}
          leftSection={Icon}
          onClick={onClick}
          onMouseDown={(e) => e.stopPropagation()}
          size="xs"
          styles={{ inner: { justifyContent: 'flex-start' } }}
          variant="subtle"
        >
          {label}
        </Button>
      )}
    </>
  );
}
