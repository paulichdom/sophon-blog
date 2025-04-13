import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Article } from '@/components/Article/Article';
import { articleQueryOptions } from '@/queries/article/article.queries';

export const Route = createFileRoute('/article/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(articleQueryOptions(slug));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const articleSlug = Route.useParams().slug;
  const { data: article } = useSuspenseQuery(articleQueryOptions(articleSlug));
  return <Article article={article} />;
}
