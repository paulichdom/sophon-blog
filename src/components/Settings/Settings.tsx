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
import { useDisclosure } from '@mantine/hooks';
import { UserAvatar } from '../UserAvatar/UserAvatar';

export function Settings() {
  const [emailModalOpened, { open: openEmailModal, close: closeEmailModal }] = useDisclosure(false);
  const [emailPasswordOpened, { open: openPasswordModal, close: closePasswordModal }] =
    useDisclosure(false);
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
                username={'DomDom'}
                sourceImage={null}
                altText={'DomDom'}
                size={80}
                radius={80}
                color="initials"
              />
              <div>
                <Text fz="lg" fw={600}>
                  {'Profile'}
                </Text>
                <Text fz="md" c="dimmed">
                  {'DomDom'}
                </Text>
              </div>
            </Group>
            <Button component={Link} to="/profile/edit" variant="light" radius="xl">
              Edit
            </Button>
          </Group>
          <Group justify="space-between">
            <div>
              <Text fz="lg" fw={600}>
                {'Email'}
              </Text>
              <Text fz="md" c="dimmed">
                {'dom.dom@dom.dom'}
              </Text>
            </div>
            <Button variant="light" radius="xl" onClick={openEmailModal}>
              Edit
            </Button>
          </Group>
          <Group justify="space-between">
            <div>
              <Text fz="lg" fw={600}>
                {'Password'}
              </Text>
              <Text fz="md" c="dimmed">
                {'********'}
              </Text>
            </div>
            <Button variant="light" radius="xl" onClick={openPasswordModal}>
              Edit
            </Button>
          </Group>
        </Stack>
      </Card>
      <Modal centered title="Email address" opened={emailModalOpened} onClose={closeEmailModal}>
        <Stack gap="lg">
          <TextInput
            required
            description="You can sign into Sophon with this email address."
            placeholder="hello@sophon.dev"
            name="email"
            variant="filled"
            radius="md"
          />
          <Group justify="flex-end">
            <Button variant="outline" radius="xl" onClick={closeEmailModal}>
              Canel
            </Button>
            <Button variant="light" radius="xl">
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
      <Modal centered title="Password" opened={emailPasswordOpened} onClose={closePasswordModal}>
        <Stack gap="lg">
          <TextInput
            description="Enter new password:"
            required
            name="email"
            variant="filled"
            radius="md"
            placeholder="Password"
          />
          <Group justify="flex-end">
            <Button variant="outline" radius="xl" onClick={closePasswordModal}>
              Canel
            </Button>
            <Button variant="light" radius="xl">
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
