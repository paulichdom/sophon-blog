import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { Avatar, Button, Flex, Modal, Space, Text, Title } from '@mantine/core';
import sophonLogo from '../../assets/images/sophon_logo.png';

type AuthModalGuard = {
  opened: boolean;
  onClose: () => void;
};

export const AuthModalGuard: FC<AuthModalGuard> = ({ opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose} centered radius="lg">
      <Flex direction="column" gap="md" align="center">
        <Avatar size={60} src={sophonLogo} />
        <Title order={3}>Sign in to Sophon</Title>
        <Button fullWidth component={Link} to="/login" variant="outline" radius="xl">
          Sign in
        </Button>
        <Flex gap={4}>
          <Text>First time here?</Text>
          <Link to="/register">Create account</Link>
        </Flex>
        <Space h="md" />
      </Flex>
    </Modal>
  );
};
