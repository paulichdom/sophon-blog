import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { MantineProvider } from '@mantine/core';
import { MainLayout } from './components/MainLayout/MainLayout';
import { theme } from './theme';

import '@mantine/core/styles.css';

const queryClinet = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClinet}>
      <MantineProvider theme={theme}>
        <MainLayout>
          <Outlet />
        </MainLayout>
        <TanStackRouterDevtools initialIsOpen={false} />
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
};
