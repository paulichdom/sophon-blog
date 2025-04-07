import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { articleQueryOptions } from '../queries/articles';

export const Route = createFileRoute('/article/$slug')({
  loader: ({ context: { queryClient }, params: { slug } }) => {
    return queryClient.ensureQueryData(articleQueryOptions(slug));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const articleSlug = Route.useParams().slug;
  const { data: article } = useSuspenseQuery(articleQueryOptions(articleSlug));
  return <h1>{article.title}</h1>;
}
