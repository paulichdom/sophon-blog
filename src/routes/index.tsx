import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { AnimatePresence } from 'motion/react';
import { Container, Grid, Stack, Tabs, Text } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { allArticlesQueryOptions } from '@/api/article/article.queries';
import { allTagsQueryOptions } from '@/api/tags/tags.queries';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleListItem, ArticleListItemSkeleton } from '@/components/ArticleListItem';
import { ConstructionBanner } from '@/components/ConstructionBanner/ConstructionBanner';
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton';
import { ServerError } from '@/components/ServerError/ServerError';
import { Tags } from '@/components/Tags/Tags';
import { range } from '@/utils';
import classes from './index.module.css';

const FEED_SKELETON_COUNT = 6;

const FeedPending = () => (
  <Stack gap={0}>
    {range(FEED_SKELETON_COUNT).map((_, index) => (
      <ArticleListItemSkeleton key={`pending-skeleton-${index}`} />
    ))}
  </Stack>
);

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) => {
    await Promise.all([
      queryClient.ensureQueryData(allArticlesQueryOptions),
      queryClient.ensureQueryData(allTagsQueryOptions),
    ]);
    return null;
  },
  component: HomePage,
  pendingComponent: FeedPending,
  errorComponent: ServerError,
});

function HomePage() {
  const navigate = Route.useNavigate();
  const { user } = useAuthStore();
  const {
    data: articlesData,
    isFetching: isFetchingArticles,
    isError: isArticlesError,
  } = useSuspenseQuery(allArticlesQueryOptions);
  const {
    data: tagsData,
    isFetching: isFetchingTags,
    isError: isTagsError,
  } = useSuspenseQuery(allTagsQueryOptions);
  const [shouldHideBanner, setHideBanner] = useLocalStorage({
    key: 'construction-banner-hidden',
    defaultValue: false,
  });
  const [activeTab, setActiveTab] = useState<string>('global');

  const hideBanner = () => {
    setHideBanner(true);
  };

  const handleTagClick = (tag: string) => {
    navigate({ to: '/$categoryId', params: { categoryId: tag } });
  };

  const renderTagsPanel = () => {
    if (isTagsError) {
      return (
        <Stack gap={4} className={classes.tagsFallback}>
          <Text fw={600}>Tags are unavailable.</Text>
          <Text size="sm" c="dimmed">
            Please refresh or try again in a moment.
          </Text>
        </Stack>
      );
    }

    return (
      <Tags tags={tagsData?.tags ?? []} onChange={handleTagClick} isLoading={isFetchingTags} />
    );
  };

  if (isArticlesError) {
    return <ServerError />;
  }

  return (
    <Container size="xl" p={0}>
      <AnimatePresence>
        {!shouldHideBanner && <ConstructionBanner key="banner" onClose={hideBanner} />}
      </AnimatePresence>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }} order={{ base: 2, md: 1 }}>
          <div>
            <Tabs
              value={activeTab}
              onChange={(value) => setActiveTab(value || 'global')}
              mb="lg"
              className={classes.feedTabs}
            >
              <Tabs.List>
                <Tabs.Tab value="global">Global Feed</Tabs.Tab>
                {user && <Tabs.Tab value="personal">Your Feed</Tabs.Tab>}
              </Tabs.List>
            </Tabs>
            <Stack gap={0}>
              {isFetchingArticles &&
                range(6).map((_, index) => <ArticleListItemSkeleton key={index} />)}
              {!isFetchingArticles &&
                articlesData &&
                articlesData.articles.map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
            </Stack>
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 1, md: 2 }}>
          {renderTagsPanel()}
        </Grid.Col>
      </Grid>
      <ScrollToTopButton />
    </Container>
  );
}
