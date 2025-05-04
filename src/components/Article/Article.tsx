import { FC } from 'react';
import { IconBookmark, IconHeart, IconHeartFilled, IconMessageCircle } from '@tabler/icons-react';
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
import { useFavoriteArticle } from '@/hooks/use-favorite-article';
import { ArticleData } from '@/types/types';
import { ArticleUserInfo } from '../ArticleCard/ArticleUserInfo';
import { Comment } from '../Comment/Comment';
import { CommentEditor } from '../CommentEditor/CommentEditor';
import { ResponsesDrawer } from '../ResponsesDrawer/ResponsesDrawer';
import { ArticleCopyButton } from './ArticleCopyButton';
import { ArticleMenuButton } from './ArticleMenuButton';

export type ArticleProps = {
  article: ArticleData;
};

export const Article: FC<ArticleProps> = ({ article }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

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
              onClick={handleFavoriteArticle}
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
            <ActionIcon variant="subtle" color="gray" onClick={open}>
              <IconMessageCircle size={20} color={theme.colors.gray[6]} stroke={1.5} />
            </ActionIcon>
            <Text size="sm" c="dimmed">
              1
            </Text>
          </Flex>
        </Group>
        <Group gap={12}>
          <ActionIcon variant="subtle" color="gray">
            <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
          </ActionIcon>
          <ArticleCopyButton articleSlug={article.slug} />
          <ArticleMenuButton slug={article.slug} />
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
      <Text size="xl" fw={700} mb="xl">
        Responses (3) or -- No responses yet
      </Text>
      <CommentEditor />
      <Divider mt="xl" mb="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <Divider my="md" />
      <Comment />
      <ResponsesDrawer opened={opened} close={close} />
    </Container>
  );
};
