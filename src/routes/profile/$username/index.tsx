import { createFileRoute } from '@tanstack/react-router';
import { SimpleGrid, Stack } from '@mantine/core';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { article } from '@/components/UserInfo/tmpMockArticle';
import { range } from '@/utils';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';

export const Route = createFileRoute('/profile/$username/')({
  component: RouteComponent,
});

function RouteComponent() {
  const MockArticles = () =>
    range(8).map((_, index) => <ArticleItem />);
  return (
    <Stack>
      <MockArticles />
    </Stack>
  );
}
