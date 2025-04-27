import { FC } from 'react';
import { IconBookmark, IconHeart, IconMessageCircle, IconShare } from '@tabler/icons-react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ActionIcon, Container, Divider, Group, Text, Title, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArticleData } from '@/types/types';
import { ArticleUserInfo } from '../ArticleCard/ArticleUserInfo';
import { Comment } from '../Comment/Comment';
import { ResponsesDrawer } from '../ResponsesDrawer/ResponsesDrawer';
import { MenuButton } from './MenuButton';

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

  return (
    <Container size="sm">
      <Title order={1}>{article.title}</Title>
      <Text c="dimmed">{article.description}</Text>
      <ArticleUserInfo author={article.author} createdAt={article.createdAt} />
      <Divider my="md" />
      <Group justify="space-between" ml={12} mr={12}>
        <Group gap={12}>
          <ActionIcon variant="subtle" color="gray">
            <IconHeart size={20} color={theme.colors.red[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray" onClick={open}>
            <IconMessageCircle size={20} color={theme.colors.gray[6]} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Group gap={12}>
          <ActionIcon variant="subtle" color="gray">
            <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
          </ActionIcon>
          <MenuButton slug={article.slug} />
        </Group>
      </Group>
      <Divider my="md" />
      <EditorContent editor={editor} />
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
      <Divider my="md" />
      <Comment />
      <ResponsesDrawer opened={opened} close={close} />
    </Container>
  );
};
