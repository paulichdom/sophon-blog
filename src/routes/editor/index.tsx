import { useState } from 'react';
import { IconCheck, IconXboxX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Button, Container, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { InfoAlert } from '@/components/InfoAlert/InfoAlert';
import { ArticleEditor } from '@/components/TextEditor/ArticleEditor';
import { INITIAL_EDITOR_CONTENT } from '@/components/TextEditor/ArticleEditor.constants';
import {
  createArticleMutationOptions,
  generateArticleMutationOptions,
} from '@/queries/article/article.mutations';
import { ArticleDto } from '@/types/types';

const INFO_TEXT =
  'Your content will be reviewed by an automated AI system to ensure it meets our guidelines.';

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [articleTitle, setArticleTitle] = useState<string>('');
  const [articleDescription, setArticleDescription] = useState<string>('');
  const [articleContent, setArticleContent] = useState<string>(INITIAL_EDITOR_CONTENT);
  const [articleTags, setArticleTags] = useState<string[]>([]);
  const [generateArticlePrompt, setGenerateArticlePrompt] = useState<string>('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createArticle, isPending: createArticlePending } = useMutation(
    createArticleMutationOptions()
  );

  const handlePublish = () => {
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
      tagList: articleTags,
    };

    createArticle(
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

  const { mutate: generateArticle, isPending: generateArticlePending } = useMutation(
    generateArticleMutationOptions()
  );

  const handleGenerateArticle = () => {
    const generateNotificationId = notifications.show({
      loading: true,
      title: 'Generating Article',
      message: 'Generating content based on the prompt...',
      autoClose: false,
      withCloseButton: false,
    });

    generateArticle(generateArticlePrompt, {
      onSuccess: (response) => {
        if (response && response.article) {
          setArticleTitle(response.article.title);
          setArticleDescription(response.article.description);
          setArticleContent(response.article.body);
          setArticleTags(response.article.tagList);
          notifications.update({
            id: generateNotificationId,
            color: 'teal',
            title: 'Article Generated',
            message: 'Content populated in the editor.',
            icon: <IconCheck size={18} />,
            loading: false,
            autoClose: 2000,
          });
        } else {
          notifications.update({
            id: generateNotificationId,
            color: 'orange',
            title: 'Generation Issue',
            message: 'Received unexpected data format.',
            icon: <IconXboxX size={18} />,
            loading: false,
            autoClose: 4000,
          });
        }
      },
      onError: (error) => {
        console.error('Error generating article:', error);
        notifications.update({
          id: generateNotificationId,
          color: 'red',
          title: 'Generation Failed',
          message: 'Could not generate article content.',
          icon: <IconXboxX size={18} />,
          loading: false,
          autoClose: 4000,
        });
      },
    });
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
        handleGenerateArticle={handleGenerateArticle}
        generateArticlePending={generateArticlePending}
        createArticlePending={createArticlePending}
        tags={articleTags}
        setTags={setArticleTags}
        generateArticlePrompt={generateArticlePrompt}
        onChangeGenerateArticlePrompt={setGenerateArticlePrompt}
      />
      <Flex direction="column" mt="lg" align="flex-end">
        <InfoAlert title="Content Moderation Notice">{INFO_TEXT}</InfoAlert>
        <Flex gap={12}>
          <Button>Save Draft</Button>
          <Button
            fullWidth={false}
            loading={createArticlePending}
            disabled={createArticlePending}
            color="green"
            onClick={handlePublish}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
