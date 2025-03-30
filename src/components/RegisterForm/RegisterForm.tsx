import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { GoogleButton } from '../GoogleButton/GoogleButton';
import { MantineLink } from '../MantineLink/MantineLink';
import { TwitterButton } from '../TwitterButton/TwitterButton';
import classes from './RegisterForm.module.css';

type RegisterFormProps = {
  form: UseFormReturnType<
    {
      name: string;
      email: string;
      password: string;
      terms: boolean;
    },
    (values: { name: string; email: string; password: string; terms: boolean }) => {
      name: string;
      email: string;
      password: string;
      terms: boolean;
    }
  >;
};

export const RegisterForm: FC<RegisterFormProps> = ({ form }) => {
  return (
    <div className={classes.container}>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" fw={500}>
          Welcome to Sophon, register with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
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

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
