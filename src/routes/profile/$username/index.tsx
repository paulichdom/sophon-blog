import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Blockquote, Stack } from '@mantine/core';
import { articlesByAuthorQueryOptions } from '@/api/article/article.queries';
import { useAuthStore } from '@/auth/auth.store';
import { ArticleItem } from '@/components/ArticleItem/ArticleItem';
import { ArticleItemPendingComponent } from '@/components/ArticleItem/ArticleItemPendingComponent';

export const Route = createFileRoute('/profile/$username/')({
  component: RouteComponent,
});

// TODO: sort by latest (FE or BE?)
function RouteComponent() {
  const { user } = useAuthStore();
  const { username } = Route.useParams();
  const { data: articlesByAuthor, isLoading } = useQuery(articlesByAuthorQueryOptions(username));

  if (isLoading || !articlesByAuthor) {
    return <ArticleItemPendingComponent />;
  }

  const hasArticles = articlesByAuthor.articlesCount > 0;
  const isCurrentUser = user?.username === username;
  const displayNameOrPronoun = isCurrentUser ? 'You' : username;
  const noArticlesMessage = isCurrentUser ? "don't have any articles." : 'has no articles.';

  return (
    <Stack>
      {!hasArticles && (
        <Blockquote color="rgba(143, 141, 141, 1)" mt="sm" radius="lg">
          {`${displayNameOrPronoun} ${noArticlesMessage}`}
        </Blockquote>
      )}
      {hasArticles &&
        articlesByAuthor.articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
    </Stack>
  );
}
