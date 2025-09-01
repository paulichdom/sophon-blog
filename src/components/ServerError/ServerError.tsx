import { Button, Container, Group, Text, Title } from '@mantine/core';
import classes from './ServerError.module.css';

export function ServerError() {
  const handleRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something unexpected just happened…</Title>
        <Text size="lg" ta="center" className={classes.description}>
          We couldn’t process your request at the moment. Don’t worry — our development team has
          already been notified. Please try refreshing the page.
        </Text>
        <Group justify="center">
          <Button variant="filled" size="md" onClick={handleRefreshPage}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
