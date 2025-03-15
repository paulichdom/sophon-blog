import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Button, Group, Switch, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <Switch
      size="md"
      color="dark.4"
      onChange={toggleColorScheme}
      onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
    />
  );
}
