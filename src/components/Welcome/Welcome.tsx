import { AppShell, Group, rem, Text } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { ArticlesCardsGrid } from '../ArticlesCardsGrid/ArticlesCardsGrid';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export function Welcome() {
  const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell header={{ height: 60, collapsed: !pinned, offset: false }} padding="md">
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Main pt={`calc(${rem(60)} + var(--mantine-spacing-md))`}>
        <ArticlesCardsGrid />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
