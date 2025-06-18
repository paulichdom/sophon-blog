import { FC } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { ActionIcon, Card, Group, Text, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '@/auth/auth.store';
import { useFavoriteArticle } from '@/hooks/use-favorite-article';
import { ArticleFavoritedState } from '@/types/types';
import { ArticleCopyButton } from '../Article/ArticleCopyButton';
import { AuthModalGuard } from '../AuthModalGuard/AuthModalGuard';
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
  const [authModalOpened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);
  const { accessToken } = useAuthStore();

  const isAuthenticated = !!accessToken;

  const {
    favoritedState,
    handleFavoriteArticle,
    favoriteArticleIsPending,
    unfavoriteArticleIsPending,
  } = useFavoriteArticle(articleSlug, articleFavoritedState);

  const handleFavoriteArticleAction = () => {
    if (isAuthenticated) {
      handleFavoriteArticle();
    } else {
      openAuthModal();
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
            onClick={handleFavoriteArticleAction}
            loading={favoriteActionIsPending}
            disabled={favoriteActionIsPending}
          >
            <IconFavorited size={20} color={theme.colors.red[6]} stroke={1.5} />
          </ActionIcon>
          <ArticleCopyButton articleSlug={articleSlug} timeout={4000} />
        </Group>
      </Group>
      <AuthModalGuard opened={authModalOpened} onClose={closeAuthModal} />
    </Card.Section>
  );
};
