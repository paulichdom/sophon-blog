import {
  IconBook,
  IconChartPie3,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconNotification,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import {
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Container,
  Divider,
  Drawer,
  Flex,
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import { UserMenu } from '../UserMenu/UserMenu';
import classes from './Header.module.css';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

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
              gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
            >
              Sophon
            </Text>
            </Link>

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

              <UserMenu />
            </Group>

            <Group visibleFrom="sm">
              <Button component={Link} to="/login" variant="default" radius="xl">
                Log in
              </Button>
              <Button component={Link} to="/register" radius="xl">
                Sign up
              </Button>
              <ColorSchemeToggle />
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h="calc(100vh - 80px" mx="-md">
            <Divider my="sm" />
            <Link to="/" className={classes.link}>
              <Flex gap="xs" align="center">
                <Text>Home</Text>
              </Flex>
            </Link>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown size={16} color={theme.colors.blue[6]} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Container>
    </Box>
  );
}
