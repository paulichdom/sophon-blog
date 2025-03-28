import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { MainLayout } from './components/MainLayout/MainLayout';
import { theme } from './theme';

import '@mantine/core/styles.css';

const queryClinet = new QueryClient();

export const App: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClinet}>
      <MantineProvider theme={theme}>
        <MainLayout>{children}</MainLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default App;
