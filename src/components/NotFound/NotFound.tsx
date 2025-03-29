import { Link } from '@tanstack/react-router';
import { Container, Group, Text, Title } from '@mantine/core';
import { Route as rootRoute } from '../../routes/__root';
import classes from './NotFound.module.css';

export function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>You have found a secret place.</Title>
      <Text
        className={classes.description}
        c="dimmed"
        size="lg"
        ta="center"
        m="auto"
        mt="var(--mantine-spacing-xl)"
        mb="calc(1.5 * var(--mantine-spacing-xl))"
      >
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Link to={rootRoute.to}>Take me back to home page</Link>
      </Group>
    </Container>
  );
}
