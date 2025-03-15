import { Container, SimpleGrid } from '@mantine/core';
import { AuthenticationForm } from '@/components/AuthenticationForm/AuthenticationForm';
import { MainLayout } from '@/components/MainLayout/MainLayout';

export const LoginPage = () => {
  return (
    <MainLayout>
      <Container py="xl">
        <SimpleGrid>
          <AuthenticationForm />
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};
