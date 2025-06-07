import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { queryClient } from './queryClient';
import { router } from './router';
import { theme } from './theme';

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';

import { useEffect } from 'react';
import { useAuthStore } from './auth/auth.store';

export const App = () => {
  const { isAuthenticated, isLoading, validateToken } = useAuthStore();

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NavigationProgress />
        <Notifications />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
