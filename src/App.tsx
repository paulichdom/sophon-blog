import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { routeTree } from './routeTree.gen';
import { theme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';

const queryClinet = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClinet,
  },
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClinet}>
      <MantineProvider theme={theme}>
        <NavigationProgress />
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
};
