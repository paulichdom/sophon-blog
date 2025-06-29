import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';
import { articlesByAuthorQueryOptions } from '@/api/article/article.queries';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';

export const Route = createFileRoute('/profile/$username/')({
  loader: ({ context: { queryClient }, params: { username } }) => {
    return queryClient.ensureQueryData(articlesByAuthorQueryOptions(username));
  },
  component: RouteComponent,
  pendingComponent: ArticleItemPendingComponent,
});

// TODO: Refresh this query (user articles) after creating a new
// article to avioid having stale data
function RouteComponent() {
  const { user } = useAuthStore();
  const { username } = Route.useParams();
  const articlesByAuthor = Route.useLoaderData();

  const hasArticles = articlesByAuthor.articlesCount > 0;
  const isCurrentUser = user?.username === username;
  const displayNameOrPronoun = isCurrentUser ? 'You' : username;
  const noArticlesMessage = isCurrentUser ? "don't have any articles." : 'has no articles.';

  return (
    <Stack>
      {!hasArticles && <p>{`${displayNameOrPronoun} ${noArticlesMessage}`} </p>}
      {hasArticles &&
        articlesByAuthor.articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
    </Stack>
  );
}
