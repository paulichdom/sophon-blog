import { FC } from 'react';
import { IconHeartFilled } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Center, Divider, Group, Text, useMantineTheme } from '@mantine/core';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleData } from '@/types/types';
import { formatDateShort } from '@/utils';
import { ArticleMenuButton } from '../Article/ArticleMenuButton';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import classes from './ArticleItem.module.css';

type ArticleItemProps = {
  article: ArticleData;
};

export const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
  const theme = useMantineTheme();
  const { accessToken, user } = useAuthStore();

  const { author } = article;
  const hasFavorites = article.favoritesCount > 0;
  const isOwner = user?.username === author.username;

  return (
    <div className={classes.body}>
      {!isOwner && (
        <Group wrap="nowrap" gap="xs" mb="lg">
          <Group gap="xs" wrap="nowrap">
            <UserAvatar
              username={author.username}
              sourceImage={author.image}
              altText={author.username}
              size={30}
              radius={30}
              color="initials"
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
        {isOwner && <ArticleMenuButton slug={article.slug} />}
      </Group>
      <Divider mt="md" mb="md" />
    </div>
  );
};
