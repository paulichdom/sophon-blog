import { useQuery } from '@tanstack/react-query';
import { ArticlesCardsGrid } from '../ArticlesCardsGrid/ArticlesCardsGrid';
import { MainLayout } from '../MainLayout/MainLayout';

export type Articles = {
  articles: Article[];
  articlesCount: number;
};

export type Article = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
};

export type Author = {
  id: number;
  username: string;
  bio: string;
  image: string;
};

export function Home() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_API_VERSION;
  const resourcePath = 'articles';
  const url = `${apiBaseUrl}/${apiVersion}/${resourcePath}`;

  const { status, data, error, isFetching } = useQuery({
    queryKey: ['articles'],
    queryFn: async (): Promise<Articles> => {
      const response = await fetch(url);
      return response.json();
    },
  });

  console.log({ data });

  return (
    <MainLayout>
      <ArticlesCardsGrid />
    </MainLayout>
  );
}
