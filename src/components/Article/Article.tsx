import { FC, Fragment } from 'react';
import { IconHeart, IconHeartFilled, IconMessageCircle } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  ActionIcon,
  Badge,
  Container,
  Divider,
  Flex,
  Group,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '@/auth/auth.store';
import { useFavoriteArticle } from '@/hooks/use-favorite-article';
import { ArticleData, Comments } from '@/types/types';
import { ArticleUserInfo } from '../ArticleCard/ArticleUserInfo';
import { AuthModalGuard } from '../AuthModalGuard/AuthModalGuard';
import { AuthShow } from '../AuthShow/AuthShow';
import { Comment } from '../Comment/Comment';
import { CommentEditor } from '../CommentEditor/CommentEditor';
import { ResponsesDrawer } from '../ResponsesDrawer/ResponsesDrawer';
import { ArticleCopyButton } from './ArticleCopyButton';
import { ArticleMenuButton } from './ArticleMenuButton';

export type ArticleProps = {
  article: ArticleData;
  commentsData: Comments;
};

export const Article: FC<ArticleProps> = ({ article, commentsData }) => {
  const [authModalOpened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { accessToken } = useAuthStore();

  const isAuthenticated = !!accessToken;

  const editor = useEditor({
    content: article.body,
    editable: false,
    extensions: [StarterKit],
  });

  const {
    favoritedState,
    handleFavoriteArticle,
    favoriteArticleIsPending,
    unfavoriteArticleIsPending,
  } = useFavoriteArticle(article.slug, {
    favorited: article.favorited,
    favoritesCount: article.favoritesCount,
  });

  const IconFavorited = favoritedState.favorited ? IconHeartFilled : IconHeart;
  const favoriteActionIsPending = favoriteArticleIsPending || unfavoriteArticleIsPending;
  const { comments } = commentsData;
  const hasComments = comments.length > 0;

  const handleOpenCommentsDrawer = () => {
    if (isAuthenticated) {
      openDrawer();
    } else {
      openAuthModal();
    }
  };

  const handleFavoriteArticleAction = () => {
    if (isAuthenticated) {
      handleFavoriteArticle();
    } else {
      openAuthModal();
    }
  };

  return (
    <Container size="sm">
      <Title order={1}>{article.title}</Title>
      <Text c="dimmed">{article.description}</Text>
      <ArticleUserInfo author={article.author} createdAt={article.createdAt} />
      <Divider my="md" />
      <Group justify="space-between" ml={12} mr={12}>
        <Group gap={20}>
          <Flex gap={4} align="center" justify="center">
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={handleFavoriteArticleAction}
              loading={favoriteActionIsPending}
              disabled={favoriteActionIsPending}
            >
              <IconFavorited size={20} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            {favoritedState.favoritesCount > 0 && (
              <Text size="sm" c="dimmed">
                {favoritedState.favoritesCount}
              </Text>
            )}
          </Flex>
          <Flex gap={4} align="center" justify="center">
            <ActionIcon variant="subtle" color="gray" onClick={handleOpenCommentsDrawer}>
              <IconMessageCircle size={20} color={theme.colors.gray[6]} stroke={1.5} />
            </ActionIcon>
            {hasComments && (
              <Text size="sm" c="dimmed">
                {comments.length}
              </Text>
            )}
          </Flex>
        </Group>
        <Group gap={12}>
          <ArticleCopyButton articleSlug={article.slug} timeout={4000} iconSize={20} />
          <AuthShow when="isOwner" ownerUsername={article.author.username}>
            <ArticleMenuButton slug={article.slug} />
          </AuthShow>
        </Group>
      </Group>
      <Divider my="md" />
      <EditorContent editor={editor} />
      <Flex
        gap="xs"
        justify="flex-start"
        align="center"
        direction="row"
        wrap="wrap"
        mt="xl"
        mb="xl"
      >
        {article.tagList.length > 0 &&
          article.tagList.map((tag) => (
            <Badge key={tag} w="fit-content" variant="light" size="lg">
              {tag}
            </Badge>
          ))}
      </Flex>
      <Divider my="xl" />
      <Text size="xl" fw={700} mb="xs">
        {hasComments ? `Responses (${comments.length})` : ' No responses yet'}
      </Text>
      <AuthShow when="loggedOut">
        <Text size="xs" mb="xl">
          <Link to="/login" style={{ marginRight: 4 }}>
            Sign in
          </Link>
          or
          <Link to="/register" style={{ margin: '0 4px' }}>
            Register
          </Link>
          to add conments on this article
        </Text>
      </AuthShow>
      <AuthShow when="loggedIn">
        <CommentEditor articleSlug={article.slug} />
        {hasComments && <Divider mt="xl" mb="xl" />}
      </AuthShow>
      {hasComments &&
        comments.map((comment, index, commentsList) => (
          <Fragment>
            <Comment key={comment.id} comment={comment} />
            {commentsList.length !== index + 1 && <Divider mt="lg" mb="lg" />}
          </Fragment>
        ))}
      <ResponsesDrawer
        opened={drawerOpened}
        close={closeDrawer}
        articleSlug={article.slug}
        comments={comments}
      />
      <AuthModalGuard opened={authModalOpened} onClose={closeAuthModal} />
    </Container>
  );
};
