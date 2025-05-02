import { FC } from 'react';
import { IconBookmark, IconCheck, IconHeart, IconHeartFilled, IconLink } from '@tabler/icons-react';
import { ActionIcon, Card, CopyButton, Group, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { useFavoriteArticle } from '@/hooks/use-favorite-article';
import { ArticleFavoritedState } from '@/types/types';
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

  // TODO: update this with actual url when app is deployed
  const DUMMY_APP_DOMAIN = 'https://sophon-blog.com';
  const shareArticleUrl = `${DUMMY_APP_DOMAIN}/articles/${articleSlug}`;

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
          <CopyButton value={shareArticleUrl} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="top">
                <ActionIcon
                  color={copied ? 'teal' : theme.colors.blue[6]}
                  variant="subtle"
                  onClick={copy}
                >
                  {copied ? <IconCheck size={20} /> : <IconLink size={20} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Group>
    </Card.Section>
  );
};
