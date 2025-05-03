import { FC } from 'react';
import { IconCheck, IconDots, IconEdit, IconTrash, IconXboxX } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { ActionIcon, Menu, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { deleteArticleMutationOptions } from '@/queries/article/article.mutations';
import { ArticleDto } from '@/types/types';
import classes from './MenuButton.module.css';

type MenuButtonProps = {
  slug: string;
};

export const ArticleMenuButton: FC<MenuButtonProps> = ({ slug }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteArticle } = useMutation(deleteArticleMutationOptions());

  const handleConfirmDeleteArticle = () => {
    const deleteArticleNotificationId = notifications.show({
      loading: true,
      title: 'Delete article',
      message: 'Deleting your article',
      autoClose: false,
      withCloseButton: false,
    });

    deleteArticle(slug, {
      onSuccess: (articleDto: ArticleDto) => {
        queryClient.invalidateQueries({ queryKey: ['articles'] });

        notifications.update({
          id: deleteArticleNotificationId,
          color: 'teal',
          title: 'Article deleted',
          message: `Article ${articleDto.article.title} removed from your list`,
          icon: <IconCheck size={18} />,
          loading: false,
          autoClose: 2000,
        });

        navigate({ to: '/' });
      },
      onError: () => {
        notifications.update({
          id: deleteArticleNotificationId,
          color: 'red',
          title: 'Delete error',
          message: 'Error occured while removing article',
          icon: <IconXboxX size={18} />,
          loading: false,
          autoClose: 2000,
        });
      },
    });
  };

  const handleDeleteArticle = () =>
    modals.openConfirmModal({
      title: 'Delete article',
      size: 'md',
      centered: true,
      children: (
        <Text size="md">Deletion is not reversible, and the story will be completely deleted.</Text>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: handleConfirmDeleteArticle,
    });

  return (
    <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <IconDots size={20} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Link to="/editor/$slug" params={{ slug }} className={classes.link}>
          <Menu.Item leftSection={<IconEdit size={16} stroke={1.5} />}>Edit Article</Menu.Item>
        </Link>
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={16} stroke={1.5} />}
          onClick={handleDeleteArticle}
        >
          Delete Article
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
