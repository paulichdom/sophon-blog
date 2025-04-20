import { useState } from 'react';
import { IconCheck, IconXboxX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Container, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { nprogress } from '@mantine/nprogress';
import { InfoAlert } from '@/components/InfoAlert/InfoAlert';
import { ArticleEditor } from '@/components/TextEditor/ArticleEditor';
import { INITIAL_EDITOR_CONTENT } from '@/components/TextEditor/ArticleEditor.constants';
import { createArticleMutationOptions } from '@/queries/article/article.mutations';
import { ArticleDto } from '@/types/types';

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

  const { mutate, isPending } = useMutation(
    createArticleMutationOptions()
  );

  const handlePublish = () => {
    nprogress.start();

    const publishArticleNotificationId = notifications.show({
      loading: true,
      title: 'Publish article',
      message: 'Publishing your article',
      autoClose: false,
      withCloseButton: false,
    });

    const article = {
      title: articleTitle,
      description: articleDescription,
      body: articleContent,
      tagList: ['mutation', 'api'],
    };

    mutate(
      { article },
      {
        onSuccess: (articleDto: ArticleDto) => {
          queryClient.invalidateQueries({ queryKey: ['articles'] });

          notifications.update({
            id: publishArticleNotificationId,
            color: 'teal',
            title: 'Article published',
            message: 'Notification will close in 2 seconds, you can close this notification now',
            icon: <IconCheck size={18} />,
            loading: false,
            autoClose: 2000,
          });

          navigate({ to: `/article/$slug`, params: { slug: articleDto.article.slug } });
        },
        onError: () => {
          notifications.update({
            id: publishArticleNotificationId,
            color: 'red',
            title: 'Publish error',
            message: 'Error occured while publishing article',
            icon: <IconXboxX size={18} />,
            loading: false,
            autoClose: 2000,
          });
        },
      }
    );
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
        <Flex gap={12}>
          <Button fullWidth={false} onClick={() => {}}>
            Save Draft
          </Button>
          <Button
            fullWidth={false}
            loading={isPending}
            disabled={isPending}
            color="green"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
