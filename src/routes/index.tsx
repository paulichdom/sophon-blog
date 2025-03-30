import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { Articles } from '@/types/types';
import { range } from '@/utils';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_API_VERSION;
  const resourcePath = 'articles';
  const url = `${apiBaseUrl}/${apiVersion}/${resourcePath}`;

  const { status, data, error, isFetching } = useQuery({
    queryKey: ['articles'],
    queryFn: async (): Promise<Articles> => {
      const response = await fetch(url);
      return response.json();
    },
  });

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {isFetching &&
        range(6).map((_, index) => <Skeleton key={index} width="100%" height={224} radius="md" />)}
      {!isFetching &&
        data &&
        data.articles.map((article) => <ArticleCard key={article.id} article={article} />)}
    </SimpleGrid>
  );
}
