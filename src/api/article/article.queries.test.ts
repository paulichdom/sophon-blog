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
  it('allArticlesQueryOptions should return correct query options', () => {
    const options = articleQueries.allArticlesQueryOptions;
    expect(options.queryKey).toEqual(['articles']);
    options.queryFn();
    expect(articleApi.fetchAllArticles).toHaveBeenCalled();
  });

  it('articlesByAuthorQueryOptions should return correct query options', () => {
    const username = 'testuser';
    const options = articleQueries.articlesByAuthorQueryOptions(username);
    expect(options.queryKey).toEqual(['articles', 'by-author', { username }]);
    options.queryFn();
    expect(articleApi.fetchArticlesByAuthor).toHaveBeenCalledWith(username);
  });

  it('articlesFavoritedByUserQueryOptions should return correct query options', () => {
    const username = 'testuser';
    const options = articleQueries.articlesFavoritedByUserQueryOptions(username);
    expect(options.queryKey).toEqual(['articles', 'favorited', { username }]);
    options.queryFn();
    expect(articleApi.fetchArticlesFavoritedByUser).toHaveBeenCalledWith(username);
  });

  it('articleQueryOptions should return correct query options', () => {
    const articleSlug = 'test-article';
    const options = articleQueries.articleQueryOptions(articleSlug);
    expect(options.queryKey).toEqual(['article', { articleSlug }]);
    options.queryFn();
    expect(articleApi.fetchArticle).toHaveBeenCalledWith(articleSlug);
  });
});
