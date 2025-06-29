export type Articles = {
  articles: ArticleData[];
  articlesCount: number;
};

export type ArticleData = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorData;
};

export type ArticleDto = {
  article: ArticleData;
};

export type AuthorData = {
  id: number;
  username: string;
  bio: string;
  image: string;
};

export type CreateArticleDto = {
  article: CreateArticleData;
};

export type CreateArticleData = {
  title: string;
  description: string;
  body: string;
  tagList: string[];
};

export type GeneratedArticle = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
};

export type UpdateArticleDto = {
  article: Partial<CreateArticleData>;
};

export type UpdateArticleMutationFnArgs = {
  articleSlug: string;
  updateArticleDto: UpdateArticleDto;
};

export type ArticleFavoritedState = {
  favorited: boolean;
  favoritesCount: number;
};

export type CreateCommentDto = {
  comment: {
    body: string;
  };
};

export type CommentData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorData;
};

export type CommentDto = {
  comment: CommentData;
};

export type CreateCommentMutationFnArgs = {
  articleSlug: string;
  createCommentDto: CreateCommentDto;
};

export type Comments = {
  comments: CommentData[];
};

export type ProfileData = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
  followers?: Partial<ProfileData>[];
};

export type ProfileDto = {
  profile: ProfileData;
};
