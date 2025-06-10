import { FC, useState } from 'react';
import { IconExclamationCircleFilled } from '@tabler/icons-react';
import {
  Button,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { MantineLink } from '../MantineLink/MantineLink';
import classes from './LoginForm.module.css';
import { notifications } from '@mantine/notifications';
import { useNavigate } from '@tanstack/react-router';
import { LoginUserDto } from '@/auth/auth.types';
import { useMutation } from '@tanstack/react-query';
import { loginMutationOptions } from '@/auth/auth.mutations';

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  form: UseFormReturnType<LoginFormValues>;
};

export const LoginForm: FC<LoginFormProps> = ({ form }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const login = useMutation(loginMutationOptions());

  const handleSubmit = (credentials: LoginUserDto) => {
    const loginUserNotificationId = notifications.show({
      loading: true,
      title: 'Login',
      message: 'Logging you in',
      autoClose: false,
      withCloseButton: false,
    });

    login.mutate(credentials, {
      onSuccess: () => {
        notifications.update({
          id: loginUserNotificationId,
          color: 'teal',
          title: 'Login successful',
          message: 'Welcome back to Sophon',
          loading: false,
          autoClose: 2000,
        });

        navigate({ to: '/' });
      },
      onError: (error) => {
        setLoginError(error.message);
        form.setErrors({ email: '', password: '' });

        notifications.update({
          id: loginUserNotificationId,
          color: 'red',
          title: 'Login error',
          message: error.message,
          loading: false,
          autoClose: 2000,
        });
      },
    });
  };

  return (
    <div className={classes.container}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Sophon, login with
        </Text>
        <form onSubmit={form.onSubmit((values) => handleSubmit({ user: values }))}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => {
                setLoginError(null);
                form.setFieldValue('email', event.currentTarget.value);
              }}
              error={form.errors.email || !!loginError}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => {
                setLoginError(null);
                form.setFieldValue('password', event.currentTarget.value);
              }}
              error={form.errors.password || !!loginError}
              radius="md"
            />
            {loginError && (
              <Flex gap={4} align="center">
                <IconExclamationCircleFilled size={14} stroke={1.5} color={theme.colors.red[9]} />
                <Text size="xs" c={theme.colors.red[9]}>
                  {loginError}
                </Text>
              </Flex>
            )}
          </Stack>
          <Group justify="space-between" mt="xl">
            <MantineLink to="/register" c="dimmed" size="xs">
              Don't have an account? Register
            </MantineLink>
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};
