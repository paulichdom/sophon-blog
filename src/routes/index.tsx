import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { ScrollToTopButton } from '@/components/ScrollToTopButton/ScrollToTopButton';
import { allArticlesQueryOptions } from '@/api/article/article.queries';
import { range } from '@/utils';
import { ArticleCardSkeleton } from '@/components/ArticleCard/ArticleCardSkeleton';

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(allArticlesQueryOptions);
  },
  component: HomePage,
  pendingComponent: ArticleCardSkeleton,
});

function HomePage() {
  const {data, isFetching} = useSuspenseQuery(allArticlesQueryOptions)

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {isFetching &&
        range(8).map((_, index) => <Skeleton key={index} width="100%" height={224} radius="md" />)}
      {!isFetching &&
        data &&
        data.articles.map((article) => <ArticleCard key={article.id} article={article} />)}
      <ScrollToTopButton />
    </SimpleGrid>
  );
}
