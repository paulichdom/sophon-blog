import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

import '@mantine/core/styles.css';

import { MainLayout } from './components/MainLayout/MainLayout';

const queryClinet = new QueryClient();

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClinet}>
        <MainLayout>
          <Outlet />
        </MainLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
