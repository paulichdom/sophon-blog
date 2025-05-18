import { queryOptions } from '@tanstack/react-query';
import {
  fetchAllArticles,
  fetchArticle,
  fetchArticlesByAuthor,
  fetchArticlesFavoritedByUser,
} from './article.api';

export const allArticlesQueryOptions = queryOptions({
  queryKey: ['articles'],
  queryFn: () => fetchAllArticles(),
});

export const articlesByAuthorQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['articles', { username }],
    queryFn: () => fetchArticlesByAuthor(username),
  });

export const articlesFavoritedByUserQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['articles', { username }],
    queryFn: () => fetchArticlesFavoritedByUser(username),
  });

export const articleQueryOptions = (articleSlug: string) =>
  queryOptions({
    queryKey: ['articles', { articleSlug }],
    queryFn: () => fetchArticle(articleSlug),
  });
