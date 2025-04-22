import { createArticle, generateArticle } from './article.api';

export const createArticleMutationOptions = () => ({
  mutationFn: createArticle,
});

export const generateArticleMutationOptions = () => ({
  mutationFn: generateArticle
})
