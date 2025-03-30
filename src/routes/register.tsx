import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RegisterForm } from '@/components/RegisterForm/RegisterForm';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

function RegisterPage() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <SimpleGrid>
      <RegisterForm form={form} />
    </SimpleGrid>
  );
}
