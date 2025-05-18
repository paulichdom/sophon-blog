import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Article } from '@/components/Article/Article';
import { articleQueryOptions } from '@/api/article/article.queries';
import { allArticleCommentsQueryOptions } from '@/api/comment/comment.queries';

export const Route = createFileRoute('/article/$slug')({
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    return await Promise.all([
      queryClient.ensureQueryData(articleQueryOptions(slug)),
      queryClient.ensureQueryData(allArticleCommentsQueryOptions(slug)),
    ]);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const articleSlug = Route.useParams().slug;
  const { data: article } = useSuspenseQuery(articleQueryOptions(articleSlug));
  const { data: commentsData } = useSuspenseQuery(
    allArticleCommentsQueryOptions(articleSlug)
  );

  return <Article article={article} commentsData={commentsData} />;
}
