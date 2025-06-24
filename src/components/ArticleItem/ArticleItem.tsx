import { FC } from 'react';
import { IconBookmark, IconHeartFilled } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Avatar, Center, Divider, Group, Text, useMantineTheme } from '@mantine/core';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleData } from '@/types/types';
import { formatDateShort } from '@/utils';
import { ArticleMenuButton } from '../Article/ArticleMenuButton';
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

  const { accessToken, user } = useAuthStore();

  const isAuthenticated = !!accessToken;
  const isOwner = user?.username === author.username;

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
        <ArticleMenuButton slug={article.slug} />
      </Group>
      <Divider mt="md" mb="md" />
    </div>
  );
};
