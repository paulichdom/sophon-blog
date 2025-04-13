import { createFileRoute } from '@tanstack/react-router';
import { Button, Container, Flex } from '@mantine/core';
import { Editor } from '@/components/Editor/Editor';
import { InfoAlert } from '@/components/InfoAlert/InfoAlert';

const INFO_TEXT =
  'Your content will be reviewed by an automated AI system to ensure it meets our guidelines before being published.';

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container fluid>
      <Editor />
      <Flex direction="column" mt="lg" align="flex-end">
        <InfoAlert title="Content Moderation Notice">{INFO_TEXT}</InfoAlert>
        <Button fullWidth={false}>Publish</Button>
      </Flex>
    </Container>
  );
}
