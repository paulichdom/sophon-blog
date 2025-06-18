import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text } from '@mantine/core';
import classes from './Footer.module.css';
import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
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
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
