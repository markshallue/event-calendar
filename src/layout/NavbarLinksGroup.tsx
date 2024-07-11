import { useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';

import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
  icon: typeof IconChevronRight;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string; icon?: typeof IconChevronRight; external?: boolean }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((navLink) => (
    <NavLink
      key={navLink.label}
      className={classes.link}
      style={({ isActive }) => ({
        backgroundColor: isActive ? '#e9ecef' : '',
        textDecoration: 'none',
      })}
      to={navLink.link}
      {...(navLink.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Text className={classes.linkLabel}>{navLink.label}</Text>
      {navLink.icon ? <navLink.icon size={14} /> : null}
    </NavLink>
  ));

  return (
    <>
      {hasLinks ? (
        <>
          <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
            <Group justify="space-between" gap={0}>
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size={18} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              {hasLinks && (
                <IconChevronRight
                  className={classes.chevron}
                  stroke={1.5}
                  style={{
                    width: rem(16),
                    height: rem(16),
                    transform: opened ? 'rotate(-90deg)' : 'none',
                  }}
                />
              )}
            </Group>
          </UnstyledButton>
          <Collapse in={opened}>{items}</Collapse>
        </>
      ) : link ? (
        <NavLink
          className={classes.control}
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#e9ecef' : '',
            textDecoration: 'none',
          })}
          to={link}
        >
          <Group justify="space-between" gap={0}>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeIcon variant="light" size={30}>
                <Icon style={{ width: rem(18), height: rem(18) }} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <IconChevronRight
                className={classes.chevron}
                stroke={1.5}
                style={{
                  width: rem(16),
                  height: rem(16),
                  transform: opened ? 'rotate(-90deg)' : 'none',
                }}
              />
            )}
          </Group>
        </NavLink>
      ) : null}
    </>
  );
}
