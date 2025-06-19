import { IconMoon, IconMoonStars, IconSun } from '@tabler/icons-react';
import { ActionIcon, Button, Group, Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import cx from 'clsx';
import classes from './ColorSchemeToggle.module.css';
export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const iconColor = computedColorScheme === 'dark' ? '#F9D87E' : 'blue'

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
        variant="subtle"
        color={iconColor}
        size="lg"
        radius="sm"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
