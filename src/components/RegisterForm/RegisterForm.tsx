import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Button, Group, Paper, Stack, Text, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { registerMutationOptions } from '@/auth/auth.mutations';
import { MantineLink } from '../MantineLink/MantineLink';
import { PasswordStrength } from '../PasswordStrength/PasswordStrength';
import classes from './RegisterForm.module.css';

type RegisterFormProps = {
  form: UseFormReturnType<
    {
      username: string;
      email: string;
      password: string;
    },
    (values: { username: string; email: string; password: string }) => {
      username: string;
      email: string;
      password: string;
    }
  >;
};

export const RegisterForm: FC<RegisterFormProps> = ({ form }) => {
  const { mutate: registerUser, isPending: registerUserPending } =
    useMutation(registerMutationOptions());
  const navigate = useNavigate();

  console.log(form)

  const handleSubmit = () => {
    const registerUserNotificationId = notifications.show({
      loading: true,
      title: 'Registering your account',
      message: 'Please wait while we create your account',
      autoClose: false,
      withCloseButton: false,
    });

    const registerUserDto = {
      user: {
        ...form.values,
      },
    };

    registerUser(registerUserDto, {
      onSuccess: () => {
        notifications.update({
          id: registerUserNotificationId,
          color: 'teal',
          title: 'Account created',
          message: 'Welcome to Sophon, please login to continue',
          loading: false,
          autoClose: 5000,
        });

        navigate({ to: '/login' });
      },
      onError: (error) => {
        notifications.update({
          id: registerUserNotificationId,
          color: 'red',
          title: 'Registration error',
          message: error.message,
          loading: false,
          autoClose: 5000,
        });
      },
    });
  };

  return (
    <div className={classes.container}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Sophon, register with
        </Text>

        {/* TODO: Add Google login */}
        {/* <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Username"
              placeholder="Your username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              radius="md"
            />

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordStrength
              value={form.values.password}
              setValue={(value) => form.setFieldValue('password', value)}
              error={form.errors.password}
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <MantineLink to="/login" c="dimmed" size="xs">
              Already have an account? Login
            </MantineLink>
            <Button type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
};
