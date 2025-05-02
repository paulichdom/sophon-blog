import { FC } from 'react';
import { IconBookmark, IconHeart, IconHeartFilled, IconLink } from '@tabler/icons-react';
import { ActionIcon, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { useFavoriteArticle } from '@/hooks/use-favorite-article';
import { ArticleFavoritedState } from '@/types/types';
import { ArticleCopyButton } from '../Article/ArticleCopyButton';
import classes from './ArticleCard.module.css';

export type ArticleCardFooterProps = {
  articleSlug: string;
  articleFavoritedState: ArticleFavoritedState;
};

export const ArticleCardFooter: FC<ArticleCardFooterProps> = ({
  articleSlug,
  articleFavoritedState,
}) => {
  const theme = useMantineTheme();

  const {
    favoritedState,
    handleFavoriteArticle,
    favoriteArticleIsPending,
    unfavoriteArticleIsPending,
  } = useFavoriteArticle(articleSlug, articleFavoritedState);

  const IconFavorited = favoritedState.favorited ? IconHeartFilled : IconHeart;
  const favoriteActionIsPending = favoriteArticleIsPending || unfavoriteArticleIsPending;

  return (
    <Card.Section className={classes.footer}>
      <Group justify="space-between">
        <Text fz="xs" c="dimmed">
          {favoritedState.favoritesCount}{' '}
          {favoritedState.favoritesCount === 1 ? 'person' : 'people'} liked this
        </Text>
        <Group gap={0}>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={handleFavoriteArticle}
            loading={favoriteActionIsPending}
            disabled={favoriteActionIsPending}
          >
            <IconFavorited size={20} color={theme.colors.red[6]} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="gray">
            <IconBookmark size={20} color={theme.colors.yellow[6]} stroke={1.5} />
          </ActionIcon>
          <ArticleCopyButton articleSlug={articleSlug} />
        </Group>
      </Group>
    </Card.Section>
  );
};
