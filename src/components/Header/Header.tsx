import { Link } from '@tanstack/react-router';
import { Box, Burger, Button, Container, Flex, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '@/auth/auth.store';
import { AuthShow } from '../AuthShow/AuthShow';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { UserMenu } from '../UserMenu/UserMenu';
import { HeaderDrawer } from './HeaderDrawer';
import classes from './Header.module.css';

export function Header() {
  const { user } = useAuthStore();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  return (
    <Box>
      <Container size="md">
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
            <Link to="/" className={classes.logo}>
              <Text
                size="xl"
                fw={900}
                variant="gradient"
                gradient={{ from: '#F5EEC1', to: '#F9D87E', deg: 145 }}
              >
                Sophon
              </Text>
            </Link>
            <Group h="100%">
              <AuthShow when="loggedIn">
                <Group h="100%" gap={0} visibleFrom="sm">
                  <Link to="/" className={classes.link}>
                    <Flex gap="xs" align="center">
                      <Text>Home</Text>
                    </Flex>
                  </Link>
                  <Link to="/editor" className={classes.link}>
                    <Flex gap="xs" align="center">
                      <Text>Write</Text>
                    </Flex>
                  </Link>
                  {user && <UserMenu user={user} />}
                </Group>
              </AuthShow>
              <AuthShow when="loggedOut">
                <Group visibleFrom="sm">
                  <Button component={Link} to="/login" variant="default" radius="xl">
                    Sign in
                  </Button>
                  <Button
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
              </AuthShow>
              <ColorSchemeToggle />
              <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
            </Group>
          </Group>
        </header>
        <HeaderDrawer opened={drawerOpened} onClose={closeDrawer} user={user} />
      </Container>
    </Box>
  );
}
