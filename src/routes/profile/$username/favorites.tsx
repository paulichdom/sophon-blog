import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';
import { articlesFavoritedByUserQueryOptions } from '@/api/article/article.queries';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';

export const Route = createFileRoute('/profile/$username/favorites')({
  loader: ({ context: { queryClient }, params: { username } }) => {
    return queryClient.ensureQueryData(articlesFavoritedByUserQueryOptions(username));
  },
  component: RouteComponent,
  pendingComponent: ArticleItemPendingComponent,
});

function RouteComponent() {
  const articlesFavoritedByUser = Route.useLoaderData();

  return (
    <Stack>
      {articlesFavoritedByUser.articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </Stack>
  );
}
