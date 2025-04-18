import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Container, Flex } from '@mantine/core';
import { InfoAlert } from '@/components/InfoAlert/InfoAlert';
import { ArticleEditor } from '@/components/TextEditor/ArticleEditor';
import { INITIAL_EDITOR_CONTENT } from '@/components/TextEditor/ArticleEditor.constants';
import { createArticleMutationOptions } from '@/queries/article/article.mutations';

const INFO_TEXT =
  'Your content will be reviewed by an automated AI system to ensure it meets our guidelines before being published.';

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleContent, setArticleContent] = useState<string>(INITIAL_EDITOR_CONTENT);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, mutate, status, isPending } = useMutation(
    createArticleMutationOptions(queryClient, navigate)
  );

  const handlePublish = () => {
    const article = {
      title: articleTitle,
      description: articleDescription,
      body: articleContent,
      tagList: ['mutation', 'api'],
    };
    mutate({ article });
  };

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
        <Button fullWidth={false} onClick={handlePublish}>
          Publish
        </Button>
      </Flex>
    </Container>
  );
}
