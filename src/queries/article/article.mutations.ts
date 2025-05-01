import {
  createArticle,
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

export const favoriteArticleMutationOptions = () => ({
  mutationFn: favoriteArticle,
});

export const unfavoriteArticleMutationOptions = () => ({
  mutationFn: unfavoriteArticle,
});
