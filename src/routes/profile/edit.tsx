import { createFileRoute } from '@tanstack/react-router';
import { Container, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { UserAvatar } from '@/components/UserAvatar/UserAvatar';

export const Route = createFileRoute('/profile/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container size="sm" px={0}>
      <Title mb={32}>Edit Profile</Title>
      <Stack gap="lg">
        <UserAvatar
          username={'DomDom'}
          sourceImage={null}
          altText={'DomDom'}
          size={80}
          radius={80}
          color="initials"
        />
        <TextInput
          size="md"
          label="Name"
          required
          name="name"
          variant="filled"
          radius="md"
          placeholder="Name"
        />
        <Textarea size="md" variant="filled" label="Bio" autosize maxRows={12} minRows={6} />
      </Stack>
    </Container>
  );
}
