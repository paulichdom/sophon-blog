import { FC, useMemo } from 'react';
import { Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { ArticleCard } from '@/components/ArticleCard/ArticleCard';
import { CATEGORY_OPTIONS, DEFAULT_CATEGORY_VALUE } from '@/components/Category';
import { ArticleData } from '@/types/types';
import classes from './CategoryResultsLayout.module.css';

const normalizeTag = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

const mockArticles: ArticleData[] = [
  {
    id: 1,
    slug: 'cascade-mastery',
    title: 'Cascade Mastery for Design Systems',
    description: 'Turn chaotic CSS into a layered system with tokens, scopes, and utilities.',
    body: 'Long-form body copy describing CSS strategies.',
    tagList: ['css', 'general'],
    createdAt: '2025-11-12T00:00:00.000Z',
    updatedAt: '2025-11-12T00:00:00.000Z',
    favorited: false,
    favoritesCount: 42,
    author: {
      id: 1,
      username: 'Avery Codes',
      bio: 'Design systems lead',
      image: 'https://avatars.githubusercontent.com/u/1?v=4',
    },
  },
  {
    id: 2,
    slug: 'react-server-scribbles',
    title: 'Server Components Without Tears',
    description: 'A React-first approach to streaming UI without clogging your headspace.',
    body: 'Extended essay on React mental models.',
    tagList: ['react', 'javascript'],
    createdAt: '2025-10-18T00:00:00.000Z',
    updatedAt: '2025-10-18T00:00:00.000Z',
    favorited: true,
    favoritesCount: 88,
    author: {
      id: 2,
      username: 'River Poe',
      bio: 'Staff Frontend @ Hyperlane',
      image: 'https://avatars.githubusercontent.com/u/2?v=4',
    },
  },
  {
    id: 3,
    slug: 'animating-for-attention',
    title: 'Micro-Interactions That Actually Convert',
    description: 'When to deploy easing, springs, and delays to guide the eye.',
    body: 'Animation best practices.',
    tagList: ['animation', 'css'],
    createdAt: '2025-09-02T00:00:00.000Z',
    updatedAt: '2025-09-02T00:00:00.000Z',
    favorited: false,
    favoritesCount: 33,
    author: {
      id: 3,
      username: 'Mira Faye',
      bio: 'Motion director',
      image: 'https://avatars.githubusercontent.com/u/3?v=4',
    },
  },
  {
    id: 4,
    slug: 'career-lattice',
    title: 'Designing Your Individual Contributor Lattice',
    description: 'Plot a career arc that swaps management ladders for maker mastery.',
    body: 'Career frameworks.',
    tagList: ['career', 'general'],
    createdAt: '2025-07-14T00:00:00.000Z',
    updatedAt: '2025-07-14T00:00:00.000Z',
    favorited: false,
    favoritesCount: 19,
    author: {
      id: 4,
      username: 'Noah Finch',
      bio: 'Product strategist',
      image: 'https://avatars.githubusercontent.com/u/4?v=4',
    },
  },
  {
    id: 5,
    slug: 'javascript-threads',
    title: 'JavaScript Threads: Web Workers Without the Pain',
    description: 'Pattern library for splitting long-running work without complicating DX.',
    body: 'JS patterns.',
    tagList: ['javascript', 'general'],
    createdAt: '2025-05-03T00:00:00.000Z',
    updatedAt: '2025-05-03T00:00:00.000Z',
    favorited: true,
    favoritesCount: 73,
    author: {
      id: 5,
      username: 'Lena Park',
      bio: 'Staff engineer',
      image: 'https://avatars.githubusercontent.com/u/5?v=4',
    },
  },
  {
    id: 6,
    slug: 'svg-systems',
    title: 'SVG Systems for Illustrative Dashboards',
    description: 'Reusable gradients, filters, and masks that keep charts crisp.',
    body: 'SVG techniques.',
    tagList: ['svg', 'css'],
    createdAt: '2025-04-20T00:00:00.000Z',
    updatedAt: '2025-04-20T00:00:00.000Z',
    favorited: false,
    favoritesCount: 21,
    author: {
      id: 6,
      username: 'Isla Ray',
      bio: 'Creative technologist',
      image: 'https://avatars.githubusercontent.com/u/6?v=4',
    },
  },
  {
    id: 7,
    slug: 'nextjs-edge-guide',
    title: 'Edge-Ready Next.js Delivery',
    description: 'Cache, stream, and personalize without losing your mind.',
    body: 'Next.js strategies.',
    tagList: ['nextjs', 'react'],
    createdAt: '2025-03-15T00:00:00.000Z',
    updatedAt: '2025-03-15T00:00:00.000Z',
    favorited: false,
    favoritesCount: 52,
    author: {
      id: 7,
      username: 'Kai Morgan',
      bio: 'Edge infra',
      image: 'https://avatars.githubusercontent.com/u/7?v=4',
    },
  },
  {
    id: 8,
    slug: 'generalists-field-guide',
    title: 'Field Guide for Full-Stack Generalists',
    description: 'Systems to juggle roadmap chaos without burning out.',
    body: 'General article.',
    tagList: ['general'],
    createdAt: '2025-01-08T00:00:00.000Z',
    updatedAt: '2025-01-08T00:00:00.000Z',
    favorited: true,
    favoritesCount: 61,
    author: {
      id: 8,
      username: 'Sloane Leigh',
      bio: 'Founder coach',
      image: 'https://avatars.githubusercontent.com/u/8?v=4',
    },
  },
];

const categoryTaglines: Record<string, string> = {
  css: 'Type-safe theming, fluid layouts, and utility orchestration.',
  react: 'Hooks, RSC, and streaming patterns for resilient UI.',
  animation: 'Easing curves and motion cues that amplify narrative.',
  career: 'Playbooks for leveling up without losing your craft.',
  javascript: 'Runtime insights, ergonomics, and DX shortcuts.',
  svg: 'Vector artistry tuned for dashboards and data viz.',
  nextjs: 'Edge-native deployments and hybrid rendering tactics.',
  [DEFAULT_CATEGORY_VALUE]: 'Latest drops from every team inside Sophon.',
};

export interface CategoryResultsLayoutProps {
  selectedCategory?: string | null;
}

export const CategoryResultsLayout: FC<CategoryResultsLayoutProps> = ({ selectedCategory }) => {
  const normalizedParam = selectedCategory ? normalizeTag(selectedCategory) : null;
  const activeValue = CATEGORY_OPTIONS.some((option) => option.value === normalizedParam)
    ? (normalizedParam as string)
    : DEFAULT_CATEGORY_VALUE;

  const filteredArticles = useMemo(() => {
    if (activeValue === DEFAULT_CATEGORY_VALUE) {
      return mockArticles;
    }
    return mockArticles.filter((article) =>
      article.tagList.some((tag) => normalizeTag(tag) === activeValue)
    );
  }, [activeValue]);

  const articleCountLabel = `${filteredArticles.length} ${
    filteredArticles.length === 1 ? 'Article' : 'Articles'
  }`;

  return (
    <Container p={0}>
      <Stack gap="xl">
        <Group className={classes.resultsHeader} align="flex-end" justify="space-between">
          <Title>
            {CATEGORY_OPTIONS.find((option) => option.value === activeValue)?.label || 'General'}
          </Title>

          <Text className={classes.articleCount}>{articleCountLabel}</Text>
        </Group>
        {filteredArticles.length > 0 ? (
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </SimpleGrid>
        ) : (
          <Paper radius="lg" className={classes.emptyState}>
            <Text fw={600}>No articles in this category yet.</Text>
            <Text size="sm" c="dimmed">
              Try a different topic while the writers assemble fresh takes.
            </Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};
