import { Link } from '@tanstack/react-router';
import { Button, Divider, Drawer, Flex, Group, ScrollArea, Text } from '@mantine/core';
import classes from './Header.module.css';

type HeaderDrawerProps = {
  opened: boolean;
  onClose: () => void;
};

export const HeaderDrawer = ({ opened, onClose }: HeaderDrawerProps) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="100%"
      padding="md"
      title={
        <Link onClick={onClose} to="/" className={classes.logo}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: '#F5EEC1', to: '#F9D87E', deg: 145 }}
          >
            Sophon
          </Text>
        </Link>
      }
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <ScrollArea h="calc(100vh - 80px" mx="-md">
        <Divider />
        <Link onClick={onClose} to="/" className={classes.link}>
          <Flex gap="xs" align="center">
            <Text>Home</Text>
          </Flex>
        </Link>
        <Link onClick={onClose} to="/editor" className={classes.link}>
          <Flex gap="xs" align="center">
            <Text>Write</Text>
          </Flex>
        </Link>
        <Divider my="sm" />
        <Group justify="center" grow pb="xl" px="md">
          <Button onClick={onClose} component={Link} to="/login" variant="default" radius="xl">
            Sign in
          </Button>
          <Button
            onClick={onClose}
            component={Link}
            to="/register"
            radius="xl"
            variant="filled"
            color="#F9D87E"
            gradient={{ from: '#F5EEC1', to: '#F9D87E', deg: 145 }}
            autoContrast
          >
            Create account
          </Button>
        </Group>
      </ScrollArea>
    </Drawer>
  );
};
