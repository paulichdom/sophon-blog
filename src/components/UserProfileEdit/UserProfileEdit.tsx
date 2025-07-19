import { FC } from 'react';
import { Button, Container, Flex, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { UserAvatar } from '../UserAvatar/UserAvatar';

type EditProfileValues = {
  username: string;
  bio: string;
  image: string;
};

type UserProfileEditProps = {
  form: UseFormReturnType<EditProfileValues>;
};

export const UserProfileEdit: FC<UserProfileEditProps> = ({ form }) => {
  return (
    <Container size="sm" px={0}>
      <Title mb={32}>Edit Profile</Title>
      <Stack gap="lg">
        <UserAvatar
          username={form.values.username}
          sourceImage={null}
          altText={form.values.username}
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
          value={form.values.username}
        />
        <Textarea
          size="md"
          variant="filled"
          label="Bio"
          autosize
          maxRows={12}
          minRows={6}
          value={form.values.bio}
        />
        <Flex justify="flex-end">
          <Button variant="outline" radius="xl" color="#5A8DEE">
            Save
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
};
