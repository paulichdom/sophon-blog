import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';
import { articlesByAuthorQueryOptions } from '@/api/article/article.queries';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';

export const Route = createFileRoute('/profile/$username/')({
  loader: ({ context: { queryClient }, params: { username } }) => {
    return queryClient.ensureQueryData(articlesByAuthorQueryOptions(username));
  },
  component: RouteComponent,
  pendingComponent: ArticleItemPendingComponent,
});

function RouteComponent() {
  const articlesByAuthor = Route.useLoaderData();

  return (
    <Stack>
      {articlesByAuthor.articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </Stack>
  );
}
