import { createArticle, favoriteArticle, generateArticle, unfavoriteArticle } from './article.api';

export const createArticleMutationOptions = () => ({
  mutationFn: createArticle,
});

export const generateArticleMutationOptions = () => ({
  mutationFn: generateArticle,
});

export const favoriteArticleMutationOptions = () => ({
  mutationFn: favoriteArticle,
});

export const unfavoriteArticleMutationOptions = () => ({
  mutationFn: unfavoriteArticle,
});
