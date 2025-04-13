import { ArticleDto, Articles } from '@/types/types';
import { API_URL } from '../constants';
import fetch from '../fetch';

export const fetchAllArticles = async () => {
  const articles: Articles = await fetch(`${API_URL}/articles`);
  return articles;
};

export const fetchArticle = async (articleSlug: string) => {
  const resourcePath = `articles/${articleSlug}`;
  const data: ArticleDto = await fetch(`${API_URL}/${resourcePath}`);

  return data.article;
};
