import { createFileRoute } from '@tanstack/react-router';
import { Blockquote, Stack } from '@mantine/core';
import { articlesFavoritedByUserQueryOptions } from '@/api/article/article.queries';
import { useAuthStore } from '@/auth/auth.store';
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
  const { user } = useAuthStore();
  const { username } = Route.useParams();
  const articlesFavoritedByUser = Route.useLoaderData();

  const hasFavoritedArticles = articlesFavoritedByUser.articlesCount > 0;
  const isCurrentUser = user?.username === username;
  const displayNameOrPronoun = isCurrentUser ? 'You' : username;
  const noArticlesMessage = isCurrentUser
    ? "don't have any favorites."
    : 'has no favorited articles.';

  return (
    <Stack>
      {!hasFavoritedArticles && (
        <Blockquote color="rgba(143, 141, 141, 1)" mt="sm" radius="lg">
          {`${displayNameOrPronoun} ${noArticlesMessage}`}
        </Blockquote>
      )}
      {hasFavoritedArticles &&
        articlesFavoritedByUser.articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
    </Stack>
  );
}
