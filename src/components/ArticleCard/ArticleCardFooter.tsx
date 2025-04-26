import { FC, useState } from 'react';
import { IconBookmark, IconHeart, IconHeartFilled, IconShare } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { ActionIcon, Card, Group, Text, useMantineTheme } from '@mantine/core';
import {
  favoriteArticleMutationOptions,
  unfavoriteArticleMutationOptions,
} from '@/queries/article/article.mutations';
import { ArticleDto } from '@/types/types';
import classes from './ArticleCard.module.css';

export type ArticleFavoritedState = {
  favorited: boolean;
  favoritesCount: number;
};

export type ArticleCardFooterProps = {
  articleSlug: string;
  articleFavoritedState: ArticleFavoritedState;
};

export const ArticleCardFooter: FC<ArticleCardFooterProps> = ({
  articleSlug,
  articleFavoritedState,
}) => {
  const theme = useMantineTheme();
  const [favoritedState, setFavoritedState] = useState<ArticleFavoritedState>(
    () => articleFavoritedState
  );

  const { mutate: favoriteArticle, isPending: favoriteArticleIsPending } = useMutation(
    favoriteArticleMutationOptions()
  );

  const { mutate: unfavoriteArticle, isPending: unfavoriteArticleIsPending } = useMutation(
    unfavoriteArticleMutationOptions()
  );

  const updateFavoritedState = (data: ArticleDto) => {
    const favoritedState = {
      favorited: data.article.favorited,
      favoritesCount: data.article.favoritesCount,
    };
    setFavoritedState(favoritedState);
  };

  const handleFavoriteArticle = () => {
    if (!favoritedState.favorited) {
      favoriteArticle(articleSlug, {
        onSuccess: updateFavoritedState,
      });
    } else {
      unfavoriteArticle(articleSlug, {
        onSuccess: updateFavoritedState,
      });
    }
  };

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
          <ActionIcon variant="subtle" color="gray">
            <IconShare size={20} color={theme.colors.blue[6]} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Group>
    </Card.Section>
  );
};
