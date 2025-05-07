import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { CommentDto, Comments, CreateCommentMutationFnArgs } from '@/types/types';

export const fetchAllComments = async (articleSlug: string) => {
  const resourcePath = `articles/${articleSlug}/comments`;
  const comments: Comments = await fetch(`${API_URL}/${resourcePath}`, {
    method: 'GET',
    credentials: 'include',
  });

  return comments;
};

export const createComment = async ({
  articleSlug,
  createCommentDto,
}: CreateCommentMutationFnArgs) => {
  const resourcePath = `articles/${articleSlug}/comments`;
  const comment: CommentDto = await fetch(`${API_URL}/${resourcePath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(createCommentDto),
    credentials: 'include',
  });

  return comment;
};
