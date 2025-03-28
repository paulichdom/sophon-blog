import { useState } from 'react';
import { Burger, Container, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';
import classes from './Header.module.css';

const links = [
  { link: '/about', label: 'Features' },
  { link: '/pricing', label: 'Pricing' },
  { link: '/learn', label: 'Learn' },
  { link: '/community', label: 'Community' },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Container size="md" className={classes.inner}>
      <Text size="xl" fw={900} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
        Sophon
      </Text>
      <Group gap={5} visibleFrom="xs">
        {items}
        <ColorSchemeToggle />
      </Group>
      <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
    </Container>
  );
}
