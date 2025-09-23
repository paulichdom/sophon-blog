import { afterEach, describe, expect, it, vi } from 'vitest';

import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';

import * as articleApi from './article.api';

vi.mock('@/shared/client', () => ({
  default: vi.fn(),
}));

vi.mock('@/shared/api.config', () => ({
  API_URL: 'http://localhost:3000/api',
}));

describe('article API', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchAllArticles', () => {
    it('should fetch all articles', async () => {
      const mockArticles = { articles: [], articlesCount: 0 };
      (fetch as any).mockResolvedValue(mockArticles);

      const result = await articleApi.fetchAllArticles();

      expect(fetch).toHaveBeenCalledWith(new URL(`${API_URL}/articles`), {
        method: 'GET',
        credentials: 'include',
      });
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchArticlesByAuthor', () => {
    it('should fetch articles by author', async () => {
      const username = 'testuser';
      const mockArticles = { articles: [], articlesCount: 0 };
      (fetch as any).mockResolvedValue(mockArticles);

      const result = await articleApi.fetchArticlesByAuthor(username);
      const expectedUrl = new URL(`${API_URL}/articles`);
      expectedUrl.searchParams.append('author', username);

      expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchArticlesFavoritedByUser', () => {
    it('should fetch articles favorited by a user', async () => {
      const username = 'testuser';
      const mockArticles = { articles: [], articlesCount: 0 };
      (fetch as any).mockResolvedValue(mockArticles);

      const result = await articleApi.fetchArticlesFavoritedByUser(username);
      const expectedUrl = new URL(`${API_URL}/articles`);
      expectedUrl.searchParams.append('favorited', username);

      expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
      expect(result).toEqual(mockArticles);
    });
  });

  describe('fetchArticle', () => {
    it('should fetch a single article by slug', async () => {
      const slug = 'test-article';
      const mockArticle = { article: { slug, title: 'Test Article', body: 'Test body' } };
      (fetch as any).mockResolvedValue(mockArticle);

      const result = await articleApi.fetchArticle(slug);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles/${slug}`, {
        method: 'GET',
        credentials: 'include',
      });
      expect(result).toEqual(mockArticle.article);
    });
  });

  describe('createArticle', () => {
    it('should create a new article', async () => {
      const createArticleDto = {
        article: { title: 'New Article', description: 'desc', body: 'Body', tagList: [] },
      };
      const mockResponse = { article: { ...createArticleDto.article, slug: 'new-article' } };
      (fetch as any).mockResolvedValue(mockResponse);

      const result = await articleApi.createArticle(createArticleDto as any);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles`, {
        method: 'POST',
        body: JSON.stringify(createArticleDto),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateArticle', () => {
    it('should update an article', async () => {
      const articleSlug = 'test-article';
      const updateArticleDto = { article: { title: 'Updated Title' } };
      const mockResponse = { article: { slug: articleSlug, title: 'Updated Title' } };
      (fetch as any).mockResolvedValue(mockResponse);

      const result = await articleApi.updateArticle({ articleSlug, updateArticleDto });

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles/${articleSlug}`, {
        method: 'PUT',
        body: JSON.stringify(updateArticleDto),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('generateArticle', () => {
    it('should generate an article from a prompt', async () => {
      const prompt = 'Test prompt';
      const mockGeneratedArticle = { title: 'Generated Title', description: 'desc', body: 'Generated body' };
      (fetch as any).mockResolvedValue(mockGeneratedArticle);

      const result = await articleApi.generateArticle(prompt);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles/generate`, {
        method: 'POST',
        body: JSON.stringify({ prompt }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      expect(result).toEqual(mockGeneratedArticle);
    });
  });

  describe('favoriteArticle', () => {
    it('should favorite an article', async () => {
      const slug = 'test-article';
      const mockResponse = { article: { slug, favorited: true } };
      (fetch as any).mockResolvedValue(mockResponse);

      const result = await articleApi.favoriteArticle(slug);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles/${slug}/favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('unfavoriteArticle', () => {
    it('should unfavorite an article', async () => {
      const slug = 'test-article';
      const mockResponse = { article: { slug, favorited: false } };
      (fetch as any).mockResolvedValue(mockResponse);

      const result = await articleApi.unfavoriteArticle(slug);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteArticle', () => {
    it('should delete an article', async () => {
      const slug = 'test-article';
      const mockResponse = {};
      (fetch as any).mockResolvedValue(mockResponse);

      const result = await articleApi.deleteArticle(slug);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/articles/${slug}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
