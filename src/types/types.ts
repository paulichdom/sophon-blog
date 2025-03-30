export type Articles = {
  articles: Article[];
  articlesCount: number;
};

export type Article = {
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
  author: Author;
};

export type Author = {
  id: number;
  username: string;
  bio: string;
  image: string;
};