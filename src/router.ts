import { createRouter } from '@tanstack/react-router';
import { nprogress } from '@mantine/nprogress';
import { queryClient } from './queryClient';
import { routeTree } from './routeTree.gen';

// Set up a Router instance
export const router = createRouter({
  routeTree,
  context: {
    queryClient,
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

// navigation progress wiring…

// Only kick off the bar if the path is actually changing
router.subscribe('onBeforeLoad', ({ pathChanged }) => {
  if (pathChanged) {
    nprogress.start();
  }
});

// When the route has loaded, finish the bar
router.subscribe('onResolved', () => {
  nprogress.complete();
});
