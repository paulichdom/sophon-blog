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
  const articles: Articles = await fetch(`${API_URL}/articles`);
  return articles;
};

export const fetchArticle = async (articleSlug: string) => {
  const resourcePath = `articles/${articleSlug}`;
  const data: ArticleDto = await fetch(`${API_URL}/${resourcePath}`);

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
