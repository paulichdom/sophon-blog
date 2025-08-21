import { QueryClient } from '@tanstack/react-query';
import {
  createArticle,
  deleteArticle,
  favoriteArticle,
  generateArticle,
  unfavoriteArticle,
  updateArticle,
} from './article.api';

export const createArticleMutationOptions = () => ({
  mutationFn: createArticle,
});

export const generateArticleMutationOptions = () => ({
  mutationFn: generateArticle,
});

export const updateArticleMutationOptions = () => ({
  mutationFn: updateArticle,
});

export const favoriteArticleMutationOptions = (queryClient?: QueryClient) => ({
  mutationFn: favoriteArticle,
  onSuccess: () => {
    if (queryClient) {
      // Invalidate articles queries to refresh the favorites list and main article list
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  },
});

export const unfavoriteArticleMutationOptions = (queryClient?: QueryClient) => ({
  mutationFn: unfavoriteArticle,
  onSuccess: () => {
    if (queryClient) {
      // Invalidate articles queries to refresh the favorites list and main article list
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    }
  },
});

export const deleteArticleMutationOptions = () => ({
  mutationFn: deleteArticle,
});
