import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Container, SimpleGrid, Skeleton } from '@mantine/core';
import { allArticlesQueryOptions } from '@/api/article/article.queries';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { ArticleCardSkeleton } from '@/components/ArticleCard/ArticleCardSkeleton';
import { ConstructionBanner } from '@/components/ConstructionBanner/ConstructionBanner';
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton';
import { ServerError } from '@/components/ServerError/ServerError';
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

  if (isError) {
    return <ServerError />;
  }

  return (
    <Container>
      <ConstructionBanner />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {isFetching &&
          range(8).map((_, index) => (
            <Skeleton key={index} width="100%" height={224} radius="md" />
          ))}
        {!isFetching &&
          data &&
          data.articles.map((article) => <ArticleCard key={article.id} article={article} />)}
        <ScrollToTopButton />
      </SimpleGrid>
    </Container>
  );
}
