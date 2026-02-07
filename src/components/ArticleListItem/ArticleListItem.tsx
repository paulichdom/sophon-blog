import { FC, useState } from 'react';
import { IconHeart } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { ActionIcon, Badge, Box, Flex, Group, Text } from '@mantine/core';
import { ArticleData } from '@/types/types';
import { formatDateShort } from '@/utils';
import { ArticleCopyButton } from '../Article/ArticleCopyButton';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import classes from './ArticleListItem.module.css';

type ArticleListItemProps = {
  article: ArticleData;
};

export const ArticleListItem: FC<ArticleListItemProps> = ({ article }) => {
  const [favoritedState, setFavoritedState] = useState({
    favoritesCount: article.favoritesCount,
    favorited: article.favorited,
  });

  const handleFavoriteClick = () => {
    // Toggle favorite state locally for immediate feedback
    setFavoritedState((prev) => ({
      favoritesCount: prev.favorited ? prev.favoritesCount - 1 : prev.favoritesCount + 1,
      favorited: !prev.favorited,
    }));
    // TODO: Implement actual API call
  };

  // Get tag colors for different categories
  const getTagColor = (tag: string) => {
    const colorMap: Record<string, string> = {
      ai: 'violet',
      javascript: 'blue',
      animation: 'yellow',
      games: 'green',
      design: 'pink',
      development: 'cyan',
      nestjs: 'green',
      api: 'gray',
      mutation: 'red',
      timing: 'yellow',
      immer: 'indigo',
    };

    return colorMap[tag.toLowerCase()] || 'gray';
  };

  return (
    <div className={classes.feedItem}>
      <Flex gap="lg" align="flex-start">
        <Box className={classes.avatarContainer}>
            <UserAvatar
              username={article.author.username}
              sourceImage={article.author.image}
              altText={article.author.username}
              size={40}
              radius="xl"
            />
        </Box>
        <Box className={classes.content}>
          <Group gap="xs" mb="xs">
            <Text fw={600} size="sm" c="bright">
              {article.author.username}
            </Text>
            <Text c="dimmed" size="sm">
              ·
            </Text>
            <Text c="dimmed" size="sm">
              posted {formatDateShort(article.createdAt)}
            </Text>
          </Group>
          <Link to="/article/$slug" params={{ slug: article.slug }} className={classes.titleLink}>
            <Text size="xl" fw={700} mb="sm" className={classes.title} lineClamp={2}>
              {article.title}
            </Text>
          </Link>
          <Text c="dimmed" mb="md" lineClamp={2}>
            {article.description}
          </Text>
          <Flex justify="space-between" align="center">
            <Group gap="xs">
              {article.tagList.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="light"
                  color={getTagColor(tag)}
                  size="sm"
                  className={classes.tag}
                >
                  {tag.toUpperCase()}
                </Badge>
              ))}
            </Group>
            <Group gap="md">
              <Group gap={4} className={classes.actionGroup}>
                <ActionIcon
                  variant="transparent"
                  c={favoritedState.favorited ? 'red' : 'dimmed'}
                  onClick={handleFavoriteClick}
                  className={classes.favoriteButton}
                >
                  <IconHeart size={16} fill={favoritedState.favorited ? 'currentColor' : 'none'} />
                </ActionIcon>
                <Text size="sm" c="dimmed">
                  {favoritedState.favoritesCount}
                </Text>
              </Group>
              <ArticleCopyButton articleSlug={article.slug} timeout={2000} iconSize={16} />
            </Group>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};
