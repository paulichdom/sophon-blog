import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Avatar, Container, Group, Menu } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { logoutMutationOptions } from '@/auth/auth.mutations';
import { useAuthStore } from '@/auth/auth.store';
import classes from './UserMenu.module.css';

export const UserMenu = () => {
  const username = 'Jane Fingerlicker';
  const navigate = useNavigate();
  const logoutMutation = useMutation(logoutMutationOptions());

  const handleLogout = () => {
    const logoutNotificationId = notifications.show({
      loading: true,
      title: 'Logout',
      message: 'Logging you out',
      autoClose: false,
      withCloseButton: false,
    });

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        useAuthStore.getState().logout();

        notifications.update({
          id: logoutNotificationId,
          color: 'teal',
          title: 'Logout successful',
          message: 'You have been logged out',
          loading: false,
          autoClose: 2000,
        });

        navigate({ to: '/' });
      },
      onError: () => {
        notifications.update({
          id: logoutNotificationId,
          color: 'red',
          title: 'Logout failed',
          message: 'There was an error logging you out',
          loading: false,
          autoClose: 2000,
        });
      },
    });
  };

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
          <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
};
