import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Container, Flex, Stack, Textarea, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { updateUserProfileMutationOptions } from '@/api/profile/profile.mutations';
import { AuthState } from '@/auth/auth.store';
import { UserData } from '@/auth/auth.types';
import { validateUsername } from '@/routes/register';
import { ProfileData } from '@/types/types';
import { UserAvatar } from '../UserAvatar/UserAvatar';

type EditProfileValues = {
  username: string;
  bio: string;
  image: string;
};

type UserProfileEditProps = {
  profile: ProfileData;
  user: UserData;
  setUser: (user: AuthState['user']) => void;
};

export const UserProfileEdit: FC<UserProfileEditProps> = ({ profile, user, setUser }) => {
  const form = useForm({
    initialValues: {
      username: profile.username || '',
      bio: profile.bio || '',
      image: profile.image || '',
    },
    validate: {
      username: validateUsername,
    },
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation(
    updateUserProfileMutationOptions()
  );

  const handleSubmit = (values: EditProfileValues) => {
    const notificationId = notifications.show({
      loading: true,
      title: 'Updating profile',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });

    updateProfile(
      { profile: values },
      {
        onSuccess: () => {
          const updatedUser = { ...user };

          if (typeof values.username !== 'undefined') {
            updatedUser.username = values.username;
          }
          if (typeof values.bio !== 'undefined' && values.bio === '') {
            updatedUser.bio = null;
          }
          if (typeof values.image !== 'undefined' && values.image === '') {
            updatedUser.image = null;
          }
          setUser(updatedUser);

          notifications.update({
            id: notificationId,
            color: 'teal',
            title: 'Profile updated',
            message: 'Your profile has been updated.',
            loading: false,
            autoClose: 4000,
          });
        },
        onError: (error: any) => {
          notifications.update({
            id: notificationId,
            color: 'red',
            title: 'Update failed',
            message: error.message || 'Failed to update profile.',
            loading: false,
            autoClose: 4000,
          });
        },
      }
    );
  };

  return (
    <Container size="sm" px={0}>
      <Title mb={32}>Edit Profile</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
            name="username"
            variant="filled"
            radius="md"
            placeholder="Name"
            {...form.getInputProps('username')}
          />
          <Textarea
            size="md"
            variant="filled"
            label="Bio"
            autosize
            maxRows={12}
            minRows={6}
            {...form.getInputProps('bio')}
          />
          <Flex justify="flex-end">
            <Button
              variant="outline"
              radius="xl"
              color="#5A8DEE"
              type="submit"
              loading={isUpdating}
              disabled={!(form.isDirty() && form.isTouched()) || !form.isValid()}
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </form>
    </Container>
  );
};
