import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Container, Grid, Skeleton, Stack, Tabs } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { allArticlesQueryOptions } from '@/api/article/article.queries';
import { ArticleListItem } from '@/components/ArticleListItem';
import { ArticleCardSkeleton } from '@/components/ArticleCard/ArticleCardSkeleton';
import { ArticleTagFilter } from '@/components/ArticleTagFilter';
import { Category, DEFAULT_CATEGORY_VALUE } from '@/components/Category';
import { ConstructionBanner } from '@/components/ConstructionBanner/ConstructionBanner';
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton';
import { ServerError } from '@/components/ServerError/ServerError';
import { range } from '@/utils';
import classes from './index.module.css';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(allArticlesQueryOptions);
  },
  component: HomePage,
  pendingComponent: ArticleCardSkeleton,
  errorComponent: ServerError,
});

function HomePage() {
  const { data, isFetching, isError } = useSuspenseQuery(allArticlesQueryOptions);
  const [shouldHideBanner, setHideBanner] = useLocalStorage({
    key: 'construction-banner-hidden',
    defaultValue: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('global');
  const navigate = Route.useNavigate();

  const hideBanner = () => {
    setHideBanner(true);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === DEFAULT_CATEGORY_VALUE) {
      return;
    }
    navigate({ to: '/$categoryId', params: { categoryId } });
  };

  const handleClearFilter = () => {
    setSelectedCategory(null);
  };

  if (isError) {
    return <ServerError />;
  }

  return (
    <Container size="xl" p={0}>
      <AnimatePresence>
        {!shouldHideBanner && <ConstructionBanner key="banner" onClose={hideBanner} />}
      </AnimatePresence>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <div>
            <Tabs
              value={activeTab}
              onChange={(value) => setActiveTab(value || 'global')}
              mb="lg"
              className={classes.feedTabs}
            >
              <Tabs.List>
                <Tabs.Tab value="global">Global Feed</Tabs.Tab>
                <Tabs.Tab value="personal">Your Feed</Tabs.Tab>
              </Tabs.List>
            </Tabs>

            <ArticleTagFilter selectedTag={selectedCategory || undefined} onClearFilter={handleClearFilter} />
            <Stack gap={0}>
              {isFetching &&
                range(6).map((_, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '24px',
                      borderBottom: index < 5 ? '1px solid var(--mantine-color-dark-6)' : 'none',
                    }}
                  >
                    <Skeleton width="100%" height={140} radius="md" />
                  </div>
                ))}
              {!isFetching &&
                data &&
                data.articles.map((article) => <ArticleListItem key={article.id} article={article} />)}
            </Stack>
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Category value={selectedCategory} onChange={handleCategoryClick} />
        </Grid.Col>
      </Grid>
      <ScrollToTopButton />
    </Container>
  );
}
