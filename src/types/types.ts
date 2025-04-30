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

export type UpdateArticleDto = {
  article: Partial<CreateArticleData>;
};

export type GeneratedArticle = {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
};
