import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { Spotlight } from '@mantine/spotlight';
import { queryClient } from './queryClient';
import { router } from './router';
import { theme } from './theme';
import { spotlightActions } from './shared/spotlight.actions';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/spotlight/styles.css';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <NavigationProgress />
        <Notifications />
        <ModalsProvider>
          <Spotlight
            actions={spotlightActions}
            searchProps={{
              leftSection: <div style={{ width: 20, height: 20 }} />,
              placeholder: 'Search topics, articles, and more...',
            }}
            nothingFound="Nothing found..."
            highlightQuery
            limit={10}
          />
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
