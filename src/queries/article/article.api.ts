import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { ArticleDto, Articles, CreateArticleDto } from '@/types/types';

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
  const response = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    body: JSON.stringify(createArticleDto),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to create article');
  }

  return response;
};
