import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Blockquote, Stack } from '@mantine/core';
import { articlesFavoritedByUserQueryOptions } from '@/api/article/article.queries';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';

export const Route = createFileRoute('/profile/$username/favorites')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = useAuthStore();
  const { username } = Route.useParams();
  const { data: articlesFavoritedByUser, isLoading } = useQuery(
    articlesFavoritedByUserQueryOptions(username)
  );

  if (isLoading || articlesFavoritedByUser === undefined) {
    return <ArticleItemPendingComponent />;
  }

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
