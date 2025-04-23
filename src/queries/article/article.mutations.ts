import { createArticle, favoriteArticle, generateArticle } from './article.api';

export const createArticleMutationOptions = () => ({
  mutationFn: createArticle,
});

export const generateArticleMutationOptions = () => ({
  mutationFn: generateArticle,
});

export const favoriteArticleMutationOptions = () => ({
  mutationFn: favoriteArticle,
});
