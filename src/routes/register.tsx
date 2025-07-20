import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { validatePassword } from '@/components/PasswordStrength/PasswordStrength.helpers';
import { RegisterForm } from '@/components/RegisterForm/RegisterForm';

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});

export const validateUsername = (val: string) => {
  if (!val || val.trim().length === 0) {
    return 'Username is required';
  }
  if (val.length < 3) {
    return 'Username should include at least 3 characters';
  }
  return null;
};

function RegisterPage() {
  const form = useForm({
    clearInputErrorOnChange: true,
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: {
      username: validateUsername,
      email: isEmail('Please provide a valid email'),
      password: validatePassword,
    },
  });

  return (
    <SimpleGrid>
      <RegisterForm form={form} />
    </SimpleGrid>
  );
}
