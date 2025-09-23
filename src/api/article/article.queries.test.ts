import { QueryClient, QueryFunctionContext } from '@tanstack/react-query';
import { describe, expect, it, vi } from 'vitest';
import * as articleApi from './article.api';
import * as articleQueries from './article.queries';

vi.mock('./article.api', () => ({
  fetchAllArticles: vi.fn(),
  fetchArticlesByAuthor: vi.fn(),
  fetchArticlesFavoritedByUser: vi.fn(),
  fetchArticle: vi.fn(),
}));

describe('article queries', () => {
  const queryClient = new QueryClient();
  const queryContext: QueryFunctionContext = {
    queryKey: [''],
    meta: undefined,
    pageParam: undefined,
    signal: new AbortController().signal,
    direction: 'forward',
    client: queryClient,
  };

  it('allArticlesQueryOptions should return correct query options', () => {
    const options = articleQueries.allArticlesQueryOptions;
    expect(options.queryKey).toEqual(['articles']);
    if (options.queryFn) {
      options.queryFn(queryContext as any);
    }
    expect(articleApi.fetchAllArticles).toHaveBeenCalled();
  });

  it('articlesByAuthorQueryOptions should return correct query options', () => {
    const username = 'testuser';
    const options = articleQueries.articlesByAuthorQueryOptions(username);
    expect(options.queryKey).toEqual(['articles', 'by-author', { username }]);
    if (options.queryFn) {
      options.queryFn(queryContext as any);
    }
    expect(articleApi.fetchArticlesByAuthor).toHaveBeenCalledWith(username);
  });

  it('articlesFavoritedByUserQueryOptions should return correct query options', () => {
    const username = 'testuser';
    const options = articleQueries.articlesFavoritedByUserQueryOptions(username);
    expect(options.queryKey).toEqual(['articles', 'favorited', { username }]);
    if (options.queryFn) {
      options.queryFn(queryContext as any);
    }
    expect(articleApi.fetchArticlesFavoritedByUser).toHaveBeenCalledWith(username);
  });

  it('articleQueryOptions should return correct query options', () => {
    const articleSlug = 'test-article';
    const options = articleQueries.articleQueryOptions(articleSlug);
    expect(options.queryKey).toEqual(['article', { articleSlug }]);
    if (options.queryFn) {
      options.queryFn(queryContext as any);
    }
    expect(articleApi.fetchArticle).toHaveBeenCalledWith(articleSlug);
  });
});
