import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid } from '@mantine/core';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { favoritedArticle } from '@/components/UserInfo/tmpMockArticle';
import { range } from '@/utils';

export const Route = createFileRoute('/profile/$username/favorites')({
  component: RouteComponent,
});

function RouteComponent() {
  const MockArticles = () =>
    range(6).map((_, index) => <ArticleCard key={index} article={favoritedArticle} />);
  return (
    <SimpleGrid mt='md' cols={{ base: 1, sm: 2 }}>
      <MockArticles />
    </SimpleGrid>
  );
}
