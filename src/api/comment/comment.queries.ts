import { queryOptions } from '@tanstack/react-query';
import { fetchAllComments } from './comment.api';

export const allArticleCommentsQueryOptions = (articleSlug: string) =>
  queryOptions({
    queryKey: ['comments'],
    queryFn: () => fetchAllComments(articleSlug),
  });
