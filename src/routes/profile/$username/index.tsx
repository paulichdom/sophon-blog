import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';
import { articlesByAuthorQueryOptions } from '@/queries/article/article.queries';

export const Route = createFileRoute('/profile/$username/')({
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(articlesByAuthorQueryOptions('JakeMiller'));
  },
  component: RouteComponent,
  pendingComponent: ArticleItemPendingComponent,
});

function RouteComponent() {
  const { data: articlesByAuthor } = useSuspenseQuery(articlesByAuthorQueryOptions('JakeMiller'));

  return (
    <Stack>
      {articlesByAuthor.articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </Stack>
  );
}
