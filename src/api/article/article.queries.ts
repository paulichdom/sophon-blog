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
    queryKey: ['articles', 'by-author', { username }],
    queryFn: () => fetchArticlesByAuthor(username),
  });

export const articlesFavoritedByUserQueryOptions = (username: string) =>
  queryOptions({
    queryKey: ['articles', 'favorited', { username }],
    queryFn: () => fetchArticlesFavoritedByUser(username),
  });

export const articleQueryOptions = (articleSlug: string) =>
  queryOptions({
    queryKey: ['article', { articleSlug }],
    queryFn: () => fetchArticle(articleSlug),
  });
