import { FC } from 'react';
import { IconBookmark, IconHeart, IconHeartFilled, IconShare } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { ActionIcon, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { favoriteArticleMutationOptions } from '@/queries/article/article.mutations';
import classes from './ArticleCard.module.css';

export type ArticleCardFooterProps = {
  favoritesCount: number;
  articleSlug: string;
  favorited: boolean;
};

export const ArticleCardFooter: FC<ArticleCardFooterProps> = ({
  favoritesCount,
  articleSlug,
  favorited,
}) => {
  const theme = useMantineTheme();
  const {
    mutate: favoriteArticle,
    data: favoritedArticle,
    isPending: favoriteArticleIsPending,
  } = useMutation(favoriteArticleMutationOptions());

  const handleFavoriteArticle = () => {
    if (!favorited) {
      favoriteArticle(articleSlug);
    }

    // unfavoriteArticle(articleSlug)
  };

  const IconFavorited = favorited ? IconHeartFilled : IconHeart;

  return (
    <Card.Section className={classes.footer}>
      <Group justify="space-between">
        <Text fz="xs" c="dimmed">
          {favoritesCount} people liked this
        </Text>
        <Group gap={0}>
          <ActionIcon variant="subtle" color="gray" onClick={handleFavoriteArticle}>
            <IconFavorited size={20} color={theme.colors.red[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Card.Section>
  );
};
