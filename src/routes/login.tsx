import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <SimpleGrid>
      <LoginForm form={form} />
    </SimpleGrid>
  );
}
