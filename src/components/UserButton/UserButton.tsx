import { IconChevronDown } from '@tabler/icons-react';
import { Avatar, Group, Text } from '@mantine/core';
import classes from './UserButton.module.css';

export function UserButton() {
  return (
    <a href="#" className={classes.link}>
      <Group gap="sm">
        <Avatar
          size={30}
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
          radius={30}
        />
        <Text fz="sm" fw={500}>
          Nancy Eggshacker
        </Text>
        <IconChevronDown size={16} stroke={3} className="mantine-rotate-rtl" />
      </Group>
    </a>
  );
}
