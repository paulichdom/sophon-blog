import { useState } from 'react';
import { IconCheck, IconXboxX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import {
  createArticleMutationOptions,
  generateArticleMutationOptions,
} from '@/queries/article/article.mutations';
import { ArticleData, ArticleDto } from '@/types/types';
import { INITIAL_EDITOR_CONTENT } from './ArticleEditor.constants';

export const useArticleEditor = (article: ArticleData | null = null) => {
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

  return {
    articleTitle,
    setArticleTitle,
    articleDescription,
    setArticleDescription,
    articleContent,
    setArticleContent,
    articleTags,
    setArticleTags,
    handlePublish,
    createArticlePending,
    generateArticlePrompt,
    setGenerateArticlePrompt,
    handleGenerateArticle,
    generateArticlePending,
  };
};
