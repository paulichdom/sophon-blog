import { FC, Fragment } from 'react';
import { Divider } from '@mantine/core';
import { UserData } from '@/auth/auth.types';
import { CommentData } from '@/types/types';
import { Comment } from '../Comment/Comment';
import { CommentEditor } from '../CommentEditor/CommentEditor';

type CommentsSectionProps = {
  articleSlug: string;
  user: UserData;
  comments: CommentData[];
};

export const CommentsSection: FC<CommentsSectionProps> = ({ articleSlug, comments, user }) => {
  const hasComments = comments.length > 0;

  return (
    <Fragment>
      <CommentEditor articleSlug={articleSlug} user={user} />
      {hasComments && <Divider mt="xl" mb="xl" />}
      {hasComments &&
        comments.map((comment, index, commentsList) => (
          <Fragment>
            <Comment key={comment.id} comment={comment} />
            {commentsList.length !== index + 1 && <Divider mt="lg" mb="lg" />}
          </Fragment>
        ))}
    </Fragment>
  );
};
