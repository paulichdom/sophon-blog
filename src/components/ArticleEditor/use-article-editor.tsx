import { useState } from 'react';
import { IconCheck, IconXboxX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { notifications } from '@mantine/notifications';
import {
  createArticleMutationOptions,
  generateArticleMutationOptions,
  updateArticleMutationOptions,
} from '@/api/article/article.mutations';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleData, ArticleDto } from '@/types/types';
import { INITIAL_EDITOR_CONTENT } from './ArticleEditor.constants';

type UseArticleEditorValue = {
  articleTitle: string;
  setArticleTitle: React.Dispatch<React.SetStateAction<string>>;
  articleDescription: string;
  setArticleDescription: React.Dispatch<React.SetStateAction<string>>;
  articleContent: string;
  setArticleContent: React.Dispatch<React.SetStateAction<string>>;
  articleTags: string[];
  setArticleTags: React.Dispatch<React.SetStateAction<string[]>>;
  handlePublishArticle: () => void;
  publishArticlePending: boolean;
  generateArticlePrompt: string;
  setGenerateArticlePrompt: React.Dispatch<React.SetStateAction<string>>;
  handleGenerateArticle: () => void;
  generateArticlePending: boolean;
  handleUpdateArticle: () => void;
  updateArticlePending: boolean;
};

export const useArticleEditor = (article: ArticleData | null = null): UseArticleEditorValue => {
  const [articleTitle, setArticleTitle] = useState<string>(() => (article ? article.title : ''));
  const [articleDescription, setArticleDescription] = useState<string>(() =>
    article ? article.description : ''
  );
  const [articleContent, setArticleContent] = useState<string>(() =>
    article ? article.body : INITIAL_EDITOR_CONTENT
  );
  const [articleTags, setArticleTags] = useState<string[]>(() => (article ? article.tagList : []));
  const [generateArticlePrompt, setGenerateArticlePrompt] = useState<string>('');

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { mutate: publishArticle, isPending: publishArticlePending } = useMutation(
    createArticleMutationOptions()
  );

  const handlePublishArticle = () => {
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

    publishArticle(
      { article },
      {
        onSuccess: (articleDto: ArticleDto) => {
          queryClient.invalidateQueries({ queryKey: ['articles'] });

          if (user?.username) {
            queryClient.invalidateQueries({
              queryKey: ['articles', 'by-author', { username: user.username }],
            });
          } else {
            queryClient.invalidateQueries({ queryKey: ['articles', 'by-author'] });
          }

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
      onError: (_error) => {
        // Error is handled by notification system

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

  const { mutate: updateArticle, isPending: updateArticlePending } = useMutation(
    updateArticleMutationOptions()
  );

  const handleUpdateArticle = () => {
    if (!article) {
      return;
    }

    const updateArticleNotificationId = notifications.show({
      loading: true,
      title: 'Update article',
      message: 'Updating your article',
      autoClose: false,
      withCloseButton: false,
    });

    const updatedArticle = {
      title: articleTitle,
      description: articleDescription,
      body: articleContent,
      tagList: articleTags,
    };

    updateArticle(
      { articleSlug: article.slug, updateArticleDto: { article: updatedArticle } },
      {
        onSuccess: (articleDto: ArticleDto) => {
          queryClient.invalidateQueries({ queryKey: ['articles'] });

          notifications.update({
            id: updateArticleNotificationId,
            color: 'teal',
            title: 'Article Updated',
            message: 'Your article has been updated succesfully',
            icon: <IconCheck size={18} />,
            loading: false,
            autoClose: 2000,
          });

          navigate({ to: `/article/$slug`, params: { slug: articleDto.article.slug } });
        },
        onError: () => {
          notifications.update({
            id: updateArticleNotificationId,
            color: 'red',
            title: 'Updated error',
            message: 'Error occured while updating article',
            icon: <IconXboxX size={18} />,
            loading: false,
            autoClose: 2000,
          });
        },
      }
    );
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
    handlePublishArticle,
    publishArticlePending,
    generateArticlePrompt,
    setGenerateArticlePrompt,
    handleGenerateArticle,
    generateArticlePending,
    handleUpdateArticle,
    updateArticlePending,
  };
};
