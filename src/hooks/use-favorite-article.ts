import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  favoriteArticleMutationOptions,
  unfavoriteArticleMutationOptions,
} from '@/api/article/article.mutations';
import { ArticleDto, ArticleFavoritedState } from '@/types/types';

type UseFavoriteArticleValue = {
  favoritedState: ArticleFavoritedState;
  setFavoritedState: React.Dispatch<React.SetStateAction<ArticleFavoritedState>>;
  handleFavoriteArticle: () => void;
  favoriteArticleIsPending: boolean;
  unfavoriteArticleIsPending: boolean;
};

export const useFavoriteArticle = (
  articleSlug: string,
  articleFavoritedState: ArticleFavoritedState
): UseFavoriteArticleValue => {
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
    if (!favoritedState.favorited) {
      favoriteArticle(articleSlug, {
        onSuccess: updateFavoritedState,
      });
    } else {
      unfavoriteArticle(articleSlug, {
        onSuccess: updateFavoritedState,
      });
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
