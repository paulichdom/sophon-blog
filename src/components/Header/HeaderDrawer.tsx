import { useEffect } from 'react';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { logoutMutationOptions } from '@/auth/auth.mutations';
import { useAuthStore } from '@/auth/auth.store';
import { UserData } from '@/auth/auth.types';
import { AuthShow } from '../AuthShow/AuthShow';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import classes from './Header.module.css';

type HeaderDrawerProps = {
  opened: boolean;
  onClose: () => void;
  user: UserData | null;
};

export const HeaderDrawer = ({ opened, onClose, user }: HeaderDrawerProps) => {
  const [colapseOpened, { toggle: toggleCollapse }] = useDisclosure(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation(logoutMutationOptions());

  useEffect(() => {
    return () => {
      if (colapseOpened) {
        toggleCollapse();
      }
    };
  });

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
        queryClient.invalidateQueries({ queryKey: ['articles'] });
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
    <Drawer
      opened={opened}
      onClose={onClose}
      size="100%"
      title={
        <Link onClick={onClose} to="/" className={classes.logo}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: '#F5EEC1', to: '#F9D87E', deg: 145 }}
          >
            Sophon
          </Text>
        </Link>
      }
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <Container px={0}>
        <Divider />
        <AuthShow when="loggedIn">
          <Link onClick={onClose} to="/" className={classes.link}>
            <Flex gap="xs" align="center">
              <Text>Home</Text>
            </Flex>
          </Link>
          <Link onClick={onClose} to="/editor" className={classes.link}>
            <Flex gap="xs" align="center">
              <Text>Write</Text>
            </Flex>
          </Link>
          {user && (
            <>
              <UnstyledButton className={classes.link} px={16} onClick={toggleCollapse}>
                <UserAvatar
                  username={user.username}
                  altText={user.username}
                  size={32}
                  radius={32}
                />
                <Text pl={8}>{user.username}</Text>
              </UnstyledButton>
              <Collapse in={colapseOpened}>
                <Link
                  onClick={onClose}
                  to="/profile/$username"
                  params={{ username: user.username }}
                  className={classes.subLink}
                >
                  <Flex gap="xs" align="center">
                    <IconUser size={16} stroke={1.5} />
                    <Text>Profile</Text>
                  </Flex>
                </Link>
                <Link
                  onClick={onClose}
                  to="/settings"
                  params={{ username: user.username }}
                  className={classes.subLink}
                >
                  <Flex gap="xs" align="center">
                    <IconSettings size={16} stroke={1.5} />
                    <Text>Account settings</Text>
                  </Flex>
                </Link>
                <UnstyledButton onClick={handleLogout} className={classes.subLink} px={34}>
                  <Flex gap="xs" align="center">
                    <IconLogout size={16} stroke={1.5} />
                    <Text>Logout</Text>
                  </Flex>
                </UnstyledButton>
              </Collapse>
            </>
          )}
          <Divider my="sm" />
        </AuthShow>
        <AuthShow when="loggedOut">
          <Stack justify="center" pb="xl" px="md" mt="md">
            <Button onClick={onClose} component={Link} to="/login" variant="default" radius="xl">
              Sign in
            </Button>
            <Button
              onClick={onClose}
              component={Link}
              to="/register"
              radius="xl"
              variant="filled"
              color="#F9D87E"
              gradient={{ from: '#F5EEC1', to: '#F9D87E', deg: 145 }}
              autoContrast
            >
              Create account
            </Button>
          </Stack>
        </AuthShow>
      </Container>
    </Drawer>
  );
};
