import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { CommentDto, CreateCommentDto } from '@/types/types';

export const createComment = async (articleSlug: string, createCommentDto: CreateCommentDto) => {
  const resourcePath = `articles/${articleSlug}/comments`;
  const comment: CommentDto = await fetch(`${API_URL}/${resourcePath}`, {
    method: 'POST',
    body: JSON.stringify(createCommentDto),
    credentials: 'include',
  });

  return comment;
};
