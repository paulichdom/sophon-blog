import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid, Tabs } from '@mantine/core';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { article } from '@/components/UserInfo/tmpMockArticle';
import { range } from '@/utils';

export const Route = createFileRoute('/profile/$username/')({
  component: RouteComponent,
});

function RouteComponent() {
  const MockArticles = () =>
    range(6).map((_, index) => <ArticleCard key={index} article={article} />);
  return (
    <SimpleGrid mt='md' cols={{ base: 1, sm: 2 }}>
      <MockArticles />
    </SimpleGrid>
  );
}
