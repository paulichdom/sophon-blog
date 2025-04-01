import { FC, ReactNode } from 'react';
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Avatar, Group, Menu, useMantineTheme, Text } from '@mantine/core';
import { Route as profileRoute } from '../../routes/profile/$username';
import classes from './UserMenu.module.css';

type UserMenuProps = {
  target?: ReactNode;
};

export const UserMenu: FC<UserMenuProps> = ({ target }) => {
  const theme = useMantineTheme();
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
          <Group gap="sm" className={classes.link}>
            <Avatar
              size={30}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
              radius={30}
            />
            <Text>Nancy Eggshacker</Text>
            <IconChevronDown
              size={16}
              stroke={3}
              className="mantine-rotate-rtl"
              color={theme.colors.blue[6]}
            />
          </Group>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            to="/profile/$username"
            /* TODO: handle this type */
            params={{ username: 'test' } as any}
            leftSection={<IconUser size={16} stroke={1.5} />}
          >
            Profile
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item leftSection={<IconHeart size={16} stroke={1.5} color={theme.colors.red[6]} />}>
            Liked posts
          </Menu.Item>
          <Menu.Item
            leftSection={<IconStar size={16} stroke={1.5} color={theme.colors.yellow[6]} />}
          >
            Saved posts
          </Menu.Item>
          <Menu.Item
            leftSection={<IconMessage size={16} stroke={1.5} color={theme.colors.blue[6]} />}
          >
            Your comments
          </Menu.Item>

          <Menu.Label>Settings</Menu.Label>
          <Menu.Item
            component={Link}
            to="/settings"
            leftSection={<IconSettings size={16} stroke={1.5} />}
          >
            Account settings
          </Menu.Item>
          <Menu.Item leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}>
            Change account
          </Menu.Item>
          <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>Logout</Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item leftSection={<IconPlayerPause size={16} stroke={1.5} />}>
            Pause subscription
          </Menu.Item>
          <Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
            Delete account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
