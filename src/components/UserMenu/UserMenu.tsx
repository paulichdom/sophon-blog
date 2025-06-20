import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Avatar, Container, Group, Menu } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { logoutMutationOptions } from '@/auth/auth.mutations';
import { useAuthStore } from '@/auth/auth.store';
import classes from './UserMenu.module.css';
import { UserData } from '@/auth/auth.types';
import { FC } from 'react';

type UserMenuProps = {
  user: UserData
}

export const UserMenu: FC<UserMenuProps> = ({user}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
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
        queryClient.invalidateQueries({queryKey: ['articles']})
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
        width={200}
        position="bottom-end"
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
            params={{ username: user.username } as any}
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
