import { FC, ReactNode } from 'react';
import {
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Avatar, Container, Group, Menu } from '@mantine/core';
import classes from './UserMenu.module.css';

export const UserMenu = () => {
  const username = 'Jane Fingerlicker';
  return (
    <Group justify="center" className={classes.group}>
      <Menu
        trigger="click-hover"
        withArrow
        width={300}
        position="bottom"
        transitionProps={{ transition: 'pop' }}
        withinPortal
      >
        <Menu.Target>
          <Container className={classes.link}>
            <Avatar
              size={30}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              radius={30}
            />
          </Container>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            to="/profile/$username"
            /* TODO: handle this type */
            params={{ username } as any}
            leftSection={<IconUser size={16} stroke={1.5} />}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            component={Link}
            to="/settings"
            leftSection={<IconSettings size={16} stroke={1.5} />}
          >
            Account settings
          </Menu.Item>
          <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
