import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { ArticlePage } from './pages/Article.page';
import { HomePage } from './pages/Home.page';
import { LoginPage } from './pages/Login.page';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { index: true, Component: HomePage },
      {
        path: '/article',
        element: <ArticlePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);
