import { FC } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { ActionIcon, Card, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '@/auth/auth.store';
import { useFavoriteArticle } from '@/hooks/use-favorite-article';
import { ArticleFavoritedState, AuthorData } from '@/types/types';
import { ArticleCopyButton } from '../Article/ArticleCopyButton';
import { AuthModalGuard } from '../AuthModalGuard/AuthModalGuard';
import classes from './ArticleCard.module.css';

export type ArticleCardFooterProps = {
  author: AuthorData;
  articleSlug: string;
  articleFavoritedState: ArticleFavoritedState;
};

export const ArticleCardFooter: FC<ArticleCardFooterProps> = ({
  author,
  articleSlug,
  articleFavoritedState,
}) => {
  const theme = useMantineTheme();
  const [authModalOpened, { open: openAuthModal, close: closeAuthModal }] = useDisclosure(false);
  const { accessToken, user } = useAuthStore();

  const isAuthenticated = !!accessToken;
  const isOwner = user?.username === author.username;

  const {
    favoritedState,
    handleFavoriteArticle,
    favoriteArticleIsPending,
    unfavoriteArticleIsPending,
  } = useFavoriteArticle(articleSlug, articleFavoritedState);

  const IconFavorited = favoritedState.favorited ? IconHeartFilled : IconHeart;
  const favoriteActionIsPending = favoriteArticleIsPending || unfavoriteArticleIsPending;
  const isDisabled = isOwner || favoriteActionIsPending;

  const handleFavoriteArticleAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isDisabled) {
      event.preventDefault();
    } else if (isAuthenticated) {
      handleFavoriteArticle();
    } else {
      openAuthModal();
    }
  };

  return (
    <Card.Section className={classes.footer}>
      <Group justify="space-between">
        <Text fz="xs" c="dimmed">
          {favoritedState.favoritesCount}{' '}
          {favoritedState.favoritesCount === 1 ? 'person' : 'people'} liked this
        </Text>
        <Group gap={4}>
          <Tooltip
            label={'You cannot favorite your own article'}
            withArrow
            position="top"
            disabled={!isOwner}
          >
            <motion.div whileHover={{ scale: 1.4 }} className={classes.footerAction}>
              <ActionIcon
                size="sm"
                variant="transparent"
                color="gray"
                onClick={handleFavoriteArticleAction}
                loading={favoriteActionIsPending}
                disabled={isDisabled}
              >
                <IconFavorited size={16} color={theme.colors.red[4]} stroke={1.5} />
              </ActionIcon>
            </motion.div>
          </Tooltip>

          <ArticleCopyButton articleSlug={articleSlug} timeout={4000} iconSize={16} />
        </Group>
      </Group>
      <AuthModalGuard opened={authModalOpened} onClose={closeAuthModal} />
    </Card.Section>
  );
};
