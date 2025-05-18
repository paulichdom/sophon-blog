import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';
import { articlesFavoritedByUserQueryOptions } from '@/api/article/article.queries';

export const Route = createFileRoute('/profile/$username/favorites')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(articlesFavoritedByUserQueryOptions('JakeMiller'));
  },
  component: RouteComponent,
  pendingComponent: ArticleItemPendingComponent,
});

function RouteComponent() {
  const { data: articlesFavoritedByUser } = useSuspenseQuery(
    articlesFavoritedByUserQueryOptions('JakeMiller')
  );

  return (
    <Stack>
      {articlesFavoritedByUser.articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </Stack>
  );
}
