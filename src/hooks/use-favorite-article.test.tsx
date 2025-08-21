import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFavoriteArticle } from './use-favorite-article';
import { ArticleFavoritedState } from '@/types/types';

// Mock the API functions
vi.mock('@/api/article/article.api', () => ({
  favoriteArticle: vi.fn().mockResolvedValue({
    article: { favorited: true, favoritesCount: 5 },
  }),
  unfavoriteArticle: vi.fn().mockResolvedValue({
    article: { favorited: false, favoritesCount: 4 },
  }),
}));

describe('useFavoriteArticle', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('should invalidate queries when favoriting an article', async () => {
    const articleSlug = 'test-article';
    const initialState: ArticleFavoritedState = {
      favorited: false,
      favoritesCount: 4,
    };

    // Spy on query invalidation
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useFavoriteArticle(articleSlug, initialState),
      { wrapper }
    );

    // Trigger favorite action
    result.current.handleFavoriteArticle();

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.favoriteArticleIsPending).toBe(false);
    });

    // Verify that queries were invalidated
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['articles'],
    });

    // Verify state was updated
    expect(result.current.favoritedState.favorited).toBe(true);
    expect(result.current.favoritedState.favoritesCount).toBe(5);
  });

  it('should invalidate queries when unfavoriting an article', async () => {
    const articleSlug = 'test-article';
    const initialState: ArticleFavoritedState = {
      favorited: true,
      favoritesCount: 5,
    };

    // Spy on query invalidation
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(
      () => useFavoriteArticle(articleSlug, initialState),
      { wrapper }
    );

    // Trigger unfavorite action
    result.current.handleFavoriteArticle();

    // Wait for mutation to complete
    await waitFor(() => {
      expect(result.current.unfavoriteArticleIsPending).toBe(false);
    });

    // Verify that queries were invalidated
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['articles'],
    });

    // Verify state was updated
    expect(result.current.favoritedState.favorited).toBe(false);
    expect(result.current.favoritedState.favoritesCount).toBe(4);
  });
});