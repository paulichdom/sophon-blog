import { FC, ReactNode } from 'react';
import { AppShell, rem } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell header={{ height: 60, collapsed: !pinned, offset: false }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>{children}</AppShell.Main>
      <Footer />
    </AppShell>
  );
};
