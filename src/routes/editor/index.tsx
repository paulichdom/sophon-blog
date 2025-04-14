import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button, Container, Flex } from '@mantine/core';
import { InfoAlert } from '@/components/InfoAlert/InfoAlert';
import { ArticleEditor } from '@/components/TextEditor/ArticleEditor';
import { INITIAL_EDITOR_CONTENT } from '@/components/TextEditor/ArticleEditor.constants';

const INFO_TEXT =
  'Your content will be reviewed by an automated AI system to ensure it meets our guidelines before being published.';

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleContent, setArticleContent] = useState<string>(INITIAL_EDITOR_CONTENT);
  
  return (
    <Container fluid>
      <ArticleEditor
        title={articleTitle}
        onChangeTitle={setArticleTitle}
        description={articleDescription}
        onChangeDescription={setArticleDescription}
        content={articleContent}
        onChangeContent={setArticleContent}
      />
      <Flex direction="column" mt="lg" align="flex-end">
        <InfoAlert title="Content Moderation Notice">{INFO_TEXT}</InfoAlert>
        <Button fullWidth={false}>Publish</Button>
      </Flex>
    </Container>
  );
}
