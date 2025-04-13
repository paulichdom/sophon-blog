import { queryOptions } from '@tanstack/react-query';
import { fetchAllArticles, fetchArticle } from './article.api';

export const allArticlesQueryOptions = queryOptions({
  queryKey: ['articles'],
  queryFn: () => fetchAllArticles(),
});

export const articleQueryOptions = (articleSlug: string) =>
  queryOptions({
    queryKey: ['articles', { articleSlug }],
    queryFn: () => fetchArticle(articleSlug),
  });
