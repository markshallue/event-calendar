import { ActionIcon, Tooltip } from '@mantine/core';
import { MouseEvent, ReactNode } from 'react';

interface TooltipActionButtonProps {
  label: string;
  color: string;
  onClick: () => void;
  icon: ReactNode;
}

export function TooltipActionButton({ label, color, onClick, icon }: TooltipActionButtonProps) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Tooltip label={label}>
      <ActionIcon color={color} onClick={handleClick}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
}
