import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  favoriteArticleMutationOptions,
  unfavoriteArticleMutationOptions,
} from '@/api/article/article.mutations';
import { articlesFavoritedByUserQueryOptions } from '@/api/article/article.queries';
import { ArticleDto, ArticleFavoritedState } from '@/types/types';

type UseFavoriteArticleProps = {
  articleSlug: string;
  articleFavoritedState: ArticleFavoritedState;
  currentUserUsername?: string;
};

type UseFavoriteArticleValue = {
  favoritedState: ArticleFavoritedState;
  setFavoritedState: React.Dispatch<React.SetStateAction<ArticleFavoritedState>>;
  handleFavoriteArticle: () => void;
  favoriteArticleIsPending: boolean;
  unfavoriteArticleIsPending: boolean;
};

export const useFavoriteArticle = ({
  articleSlug,
  articleFavoritedState,
  currentUserUsername,
}: UseFavoriteArticleProps): UseFavoriteArticleValue => {
  const queryClient = useQueryClient();
  const [favoritedState, setFavoritedState] = useState<ArticleFavoritedState>(
    () => articleFavoritedState
  );

  const { mutate: favoriteArticle, isPending: favoriteArticleIsPending } = useMutation(
    favoriteArticleMutationOptions()
  );

  const { mutate: unfavoriteArticle, isPending: unfavoriteArticleIsPending } = useMutation(
    unfavoriteArticleMutationOptions()
  );

  const updateFavoritedState = (data: ArticleDto) => {
    const favoritedState = {
      favorited: data.article.favorited,
      favoritesCount: data.article.favoritesCount,
    };
    setFavoritedState(favoritedState);
  };

  const handleFavoriteArticle = () => {
    const options = {
      onSuccess: (data: ArticleDto) => {
        updateFavoritedState(data);
        if (currentUserUsername) {
          queryClient.invalidateQueries({
            queryKey: articlesFavoritedByUserQueryOptions(currentUserUsername).queryKey,
          });
        }
      },
      onError: (_error: unknown) => {
        // Error is handled by the mutation's error handling
      },
    };

    if (!favoritedState.favorited) {
      favoriteArticle(articleSlug, options);
    } else {
      unfavoriteArticle(articleSlug, options);
    }
  };

  return {
    favoritedState,
    setFavoritedState,
    handleFavoriteArticle,
    favoriteArticleIsPending,
    unfavoriteArticleIsPending,
  };
};
