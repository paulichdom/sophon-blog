import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { AppShell, Container, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { NotFound } from '@/components/NotFound/NotFound';
import { NavigationProgress } from '@mantine/nprogress';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  const pinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell header={{ height: 60, offset: false }} padding="md">
      {/* TODO: Implement navigation progress */}
      <NavigationProgress />
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <Container py="xl">
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
          <TanStackRouterDevtools initialIsOpen={false} />
        </Container>
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
