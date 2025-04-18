import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import {
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { loginMutationOptions } from '@/auth/auth.mutations';
import { useAuthStore } from '@/auth/use-auth-store';
import { GoogleButton } from '../GoogleButton/GoogleButton';
import { MantineLink } from '../MantineLink/MantineLink';
import { TwitterButton } from '../TwitterButton/TwitterButton';
import classes from './LoginForm.module.css';

type LoginFormProps = {
  form: UseFormReturnType<
    {
      email: string;
      password: string;
    },
    (values: { email: string; password: string }) => {
      email: string;
      password: string;
    }
  >;
};

export const LoginForm: FC<LoginFormProps> = ({ form }) => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const mutation = useMutation(loginMutationOptions(navigate, setUser));
  
  const handleSubmit = () => {
    const loginUserDto = {
      user: {
        ...form.values,
      },
    };
    mutation.mutate(loginUserDto);
  };
  return (
    <div className={classes.container}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Sophon, login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
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
