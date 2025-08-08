import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  Button,
  Card,
  Container,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { updateUserMutationOptions } from '@/api/user/user.mutations';
import { AuthState } from '@/auth/auth.store';
import { UserData } from '@/auth/auth.types';
import { PasswordStrength } from '../PasswordStrength/PasswordStrength';
import { validatePassword } from '../PasswordStrength/PasswordStrength.helpers';
import { UserAvatar } from '../UserAvatar/UserAvatar';

type SettingsProps = {
  user: UserData;
  setUser: (user: AuthState['user']) => void;
};

export const Settings: FC<SettingsProps> = ({ user, setUser }) => {
  const [emailModalOpened, { open: openEmailModal, close: closeEmailModal }] = useDisclosure(false);
  const [emailPasswordOpened, { open: openPasswordModal, close: closePasswordModal }] =
    useDisclosure(false);

  const emailForm = useForm({
    initialValues: { email: user?.email || '' },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  const passwordForm = useForm({
    initialValues: { password: '' },
    validate: {
      password: validatePassword,
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = useMutation(updateUserMutationOptions());

  const handleEmailSubmit = (values: { email: string }) => {
    if (!user?.username) {
      return;
    }
    const notificationId = notifications.show({
      loading: true,
      title: 'Updating email',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });
    updateUser(
      { input: { user: { email: values.email } }, userId: user.id },
      {
        onSuccess: () => {
          setUser({ ...user, email: values.email });
          notifications.update({
            id: notificationId,
            color: 'teal',
            title: 'Email updated',
            message: 'Your email has been updated.',
            loading: false,
            autoClose: 2000,
          });

          closeEmailModal();
        },
        onError: (error: any) => {
          notifications.update({
            id: notificationId,
            color: 'red',
            title: 'Update failed',
            message: error.message || 'Failed to update email.',
            loading: false,
            autoClose: 4000,
          });
        },
      }
    );
  };

  const handlePasswordSubmit = (values: { password: string }) => {
    if (!user?.username) {
      return;
    }
    const notificationId = notifications.show({
      loading: true,
      title: 'Updating password',
      message: 'Please wait...',
      autoClose: false,
      withCloseButton: false,
    });
    updateUser(
      { input: { user: { password: values.password } }, userId: user.id },
      {
        onSuccess: () => {
          notifications.update({
            id: notificationId,
            color: 'teal',
            title: 'Password updated',
            message: 'Your password has been updated.',
            loading: false,
            autoClose: 2000,
          });
          closePasswordModal();
        },
        onError: (error: any) => {
          notifications.update({
            id: notificationId,
            color: 'red',
            title: 'Update failed',
            message: error.message || 'Failed to update password.',
            loading: false,
            autoClose: 4000,
          });
        },
      }
    );
  };

  return (
    <Container size="sm" px={0}>
      <Title size="h1" mb={32}>
        Account Settings
      </Title>
      <Card withBorder radius={10} style={{ backgroundColor: 'transparent' }}>
        <Stack gap="xl">
          <Group justify="space-between">
            <Group gap="sm">
              <UserAvatar
                username={user.username}
                sourceImage={null}
                altText={user.username}
                size={80}
                radius={80}
                color="initials"
              />
              <div>
                <Text fz="lg" fw={600}>
                  Profile
                </Text>
                <Text fz="md" c="dimmed">
                  {user.username}
                </Text>
              </div>
            </Group>
            <Button
              component={Link}
              to="/profile/edit"
              variant="outline"
              color="#5A8DEE"
              radius="xl"
            >
              Edit
            </Button>
          </Group>
          <Group justify="space-between">
            <div>
              <Text fz="lg" fw={600}>
                Email
              </Text>
              <Text fz="md" c="dimmed">
                {user.email}
              </Text>
            </div>
            <Button variant="outline" color="#5A8DEE" radius="xl" onClick={openEmailModal}>
              Edit
            </Button>
          </Group>
          <Group justify="space-between">
            <div>
              <Text fz="lg" fw={600}>
                Password
              </Text>
              <Text fz="md" c="dimmed">
                ********
              </Text>
            </div>
            <Button variant="outline" color="#5A8DEE" radius="xl" onClick={openPasswordModal}>
              Edit
            </Button>
          </Group>
        </Stack>
      </Card>
      <Modal centered title="Email address" opened={emailModalOpened} onClose={closeEmailModal}>
        <form onSubmit={emailForm.onSubmit(handleEmailSubmit)}>
          <Stack gap="lg">
            <TextInput
              required
              description="You can sign into Sophon with this email address."
              placeholder="hello@sophon.dev"
              name="email"
              variant="filled"
              radius="md"
              {...emailForm.getInputProps('email')}
            />
            <Group justify="flex-end">
              <Button variant="outline" radius="xl" onClick={closeEmailModal} type="button">
                Cancel
              </Button>
              <Button variant="light" radius="xl" type="submit" loading={isUpdating}>
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Modal centered title="Password" opened={emailPasswordOpened} onClose={closePasswordModal}>
        <form onSubmit={passwordForm.onSubmit(handlePasswordSubmit)}>
          <Stack gap="lg">
            <PasswordStrength
              value={passwordForm.values.password}
              placeholder="Your new password"
              setValue={(val) => passwordForm.setFieldValue('password', val)}
              error={passwordForm.errors.password}
            />
            <Group justify="flex-end">
              <Button variant="outline" radius="xl" onClick={closePasswordModal} type="button">
                Cancel
              </Button>
              <Button variant="light" radius="xl" type="submit" loading={isUpdating}>
                Save
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};
