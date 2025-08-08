import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import {
  ArticleDto,
  Articles,
  CreateArticleDto,
  GeneratedArticle,
  UpdateArticleMutationFnArgs,
} from '@/types/types';

export const fetchAllArticles = async () => {
  const url = new URL(`${API_URL}/articles`);
  const articles: Articles = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  return articles;
};

export const fetchArticlesByAuthor = async (username: string) => {
  const url = new URL(`${API_URL}/articles`);
  url.searchParams.append('author', username);

  const articles: Articles = await fetch(url.toString());
  return articles;
};

export const fetchArticlesFavoritedByUser = async (username: string) => {
  const url = new URL(`${API_URL}/articles`);
  url.searchParams.append('favorited', username);

  const articles: Articles = await fetch(url.toString());
  return articles;
};

export const fetchArticle = async (articleSlug: string) => {
  const resourcePath = `articles/${articleSlug}`;
  const data: ArticleDto = await fetch(`${API_URL}/${resourcePath}`, {
    method: 'GET',
    credentials: 'include',
  });

  return data.article;
};

export const createArticle = async (createArticleDto: CreateArticleDto) => {
  const response: ArticleDto = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    body: JSON.stringify(createArticleDto),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return response;
};

export const updateArticle = async ({
  articleSlug,
  updateArticleDto,
}: UpdateArticleMutationFnArgs) => {
  const response: ArticleDto = await fetch(`${API_URL}/articles/${articleSlug}`, {
    method: 'PUT',
    body: JSON.stringify(updateArticleDto),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return response;
};

export const generateArticle = async (prompt: string) => {
  const generatedArticleObject: GeneratedArticle = await fetch(`${API_URL}/articles/generate`, {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return generatedArticleObject;
};

export const favoriteArticle = async (slug: string) => {
  const favoritedArticle: ArticleDto = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return favoritedArticle;
};

export const unfavoriteArticle = async (slug: string) => {
  const favoritedArticle: ArticleDto = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return favoritedArticle;
};

export const deleteArticle = async (slug: string) => {
  const deletedArticle: ArticleDto = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  return deletedArticle;
};
