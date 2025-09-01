import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Container, SimpleGrid, Skeleton, Grid } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { allArticlesQueryOptions } from '@/api/article/article.queries';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { ArticleCardSkeleton } from '@/components/ArticleCard/ArticleCardSkeleton';
import { ConstructionBanner } from '@/components/ConstructionBanner/ConstructionBanner';
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton';
import { ServerError } from '@/components/ServerError/ServerError';
import { Category } from '@/components/Category';
import { range } from '@/utils';

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

  const hideBanner = () => {
    setHideBanner(true);
  };

  const handleCategoryClick = (categoryId: string) => {
    // Toggle selection: if same category is clicked, deselect it
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
    console.log(`Clicked category: ${categoryId}`);
  };

  const handleShowAllClick = () => {
    setSelectedCategory(null);
    console.log('Show all topics clicked');
  };

  if (isError) {
    return <ServerError />;
  }

  return (
    <Container size="xl" px="md">
      <AnimatePresence>
        {!shouldHideBanner && <ConstructionBanner key="banner" onClose={hideBanner} />}
      </AnimatePresence>
      
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {isFetching &&
              range(8).map((_, index) => (
                <Skeleton key={index} width="100%" height={224} radius="md" />
              ))}
            {!isFetching &&
              data &&
              data.articles.map((article) => <ArticleCard key={article.id} article={article} />)}
          </SimpleGrid>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Category 
            selectedCategoryId={selectedCategory ?? undefined}
            onCategoryClick={handleCategoryClick}
            onShowAllClick={handleShowAllClick}
          />
        </Grid.Col>
      </Grid>
      
      <ScrollToTopButton />
    </Container>
  );
}
