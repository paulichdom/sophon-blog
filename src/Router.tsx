import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ArticlePage } from './pages/Article.page';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';
import { useQuery } from '@tanstack/react-query';
import { Article } from './components/Home/Home';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_API_VERSION;
  const resourcePath = 'articles';
  const url = `${apiBaseUrl}/${apiVersion}/${resourcePath}`;

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      {
        path: '/article/:slug',
        loader: async ({params}) => {
          let  article = await useQuery({
            queryKey: ['articles'],
            queryFn: async (): Promise<Article> => {
              const response = await fetch(`${url}/${params.slug}`)
              return response.json()
            }
          })
          return article
        },
        Component: ArticlePage,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
