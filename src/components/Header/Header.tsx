import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Burger, Container, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import classes from './Header.module.css';
import { UserMenu } from '../UserMenu/UserMenu';

const links = [
  { link: '/', label: 'Home' },
  { link: '/login', label: 'Login' },
  { link: '/register', label: 'Sign up' },
  { link: '/settings', label: 'Settings' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Container size="md" className={classes.inner}>
      <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
        Sophon
      </Text>
      <Group gap={5} visibleFrom="xs">
        {items}
        <ColorSchemeToggle />
        <UserMenu />
      </Group>
      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
    </Container>
  );
}
