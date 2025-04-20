import { createArticle } from './article.api';

export const createArticleMutationOptions = () => ({
  mutationFn: createArticle,
});
