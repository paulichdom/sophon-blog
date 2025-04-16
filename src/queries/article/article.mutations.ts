import { QueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { ArticleDto } from '@/types/types';
import { createArticle } from './article.api';

export const createArticleMutationOptions = (
  queryClient: QueryClient,
  navigate: ReturnType<typeof useNavigate>
) => ({
  mutationFn: createArticle,
  onSuccess: (articleDto: ArticleDto) => {
    queryClient.invalidateQueries({ queryKey: ['articles'] });
    navigate({ to: `/article/$slug`, params: { slug: articleDto.article.slug } });
  },
});
