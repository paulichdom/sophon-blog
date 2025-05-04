import { createComment } from './comment.api';

export const createCommentMutationOptions = () => ({
  mutationFn: createComment,
});
