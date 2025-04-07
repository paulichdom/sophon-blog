import { queryOptions } from '@tanstack/react-query';

import { ArticleDto } from '@/types/types';
import { API_URL } from './constants';
import fetch from './fetch';

export const fetchArticle = async (articleSlug: string) => {
  const resourcePath = `articles/${articleSlug}`;
  const data: ArticleDto = await fetch(`${API_URL}/${resourcePath}`);

  return data.article;
};

export const articleQueryOptions = (articleSlug: string) =>
  queryOptions({
    queryKey: ['articles', { articleSlug }],
    queryFn: () => fetchArticle(articleSlug),
  });
