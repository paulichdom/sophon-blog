import { useQuery } from '@tanstack/react-query';
import { ArticlesCardsGrid } from '../ArticlesCardsGrid/ArticlesCardsGrid';
import { MainLayout } from '../MainLayout/MainLayout';

export function Home() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = 'api/v1';
  const resourcePath = 'articles';
  const url = `${apiBaseUrl}/${apiVersion}/${resourcePath}`;

  const query = useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await fetch(url);
      return response;
    },
  });

  return (
    <MainLayout>
      <ArticlesCardsGrid />
    </MainLayout>
  );
}
