import { ActionIcon, Tooltip } from '@mantine/core';

interface IconLinkProps {
  label: string;
  color: string;
  link: string;
  icon: React.ReactNode;
}
export function IconLink({ label, color, link, icon: Icon }: IconLinkProps) {
  return (
    <Tooltip
      label={label}
      styles={{ tooltip: { fontSize: '0.75rem', padding: '0.125rem 0.5rem' } }}
      zIndex={501}
    >
      <ActionIcon
        data-color={color}
        color={color}
        variant="subtle"
        component="a"
        target="_blank"
        rel="noreferrer"
        href={link}
      >
        {Icon}
      </ActionIcon>
    </Tooltip>
  );
}
