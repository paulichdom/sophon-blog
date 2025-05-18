import { FC } from 'react';
import { IconBookmark, IconHeartFilled } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Avatar, Center, Divider, Group, Text, useMantineTheme } from '@mantine/core';
import { ArticleData } from '@/types/types';
import { formatDateShort } from '@/utils';
import { ArticleItemMenu } from './ArticleItemMenu';
import classes from './ArticleItem.module.css';

type ArticleItemProps = {
  article: ArticleData;
};

export const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const theme = useMantineTheme();

  const { author } = article;
  const hasFavorites = article.favoritesCount > 0;

  // Placeholder
  const isCurrentUser = true;

  return (
    <div className={classes.body}>
      {!isCurrentUser && (
        <Group wrap="nowrap" gap="xs">
          <Group gap="xs" wrap="nowrap">
            <Avatar
              size={20}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            />
            <Text size="xs">{author.username}</Text>
          </Group>
        </Group>
      )}
      <Link
        to="/article/$slug"
        params={{
          slug: article.slug,
        }}
      >
        <Text lineClamp={2} className={classes.title} mb="md">
          {article.title}
        </Text>
      </Link>
      <Text lineClamp={2} c="dimmed" mb="lg">
        {article.description}
      </Text>
      <Group justify="space-between">
        <Group gap={12}>
          <Text size="xs" c="dimmed">
            {formatDateShort(article.createdAt)}
          </Text>
          {hasFavorites && (
            <Center>
              <IconHeartFilled size={16} stroke={1.5} color={theme.colors.dark[2]} />
              <Text size="sm" className={classes.bodyText}>
                {article.favoritesCount}
              </Text>
            </Center>
          )}
        </Group>
        <Group gap={12}>
          <ActionIcon variant="subtle" color="gray">
            <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
          </ActionIcon>
          <ArticleItemMenu />
        </Group>
      </Group>
      <Divider mt="md" mb="md" />
    </div>
  );
};
