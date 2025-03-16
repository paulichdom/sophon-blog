import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

import '@mantine/core/styles.css';

const queryClinet = new QueryClient();

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClinet}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
