import { FC, Fragment } from 'react';
import { Divider, Drawer } from '@mantine/core';
import { UserData } from '@/auth/auth.types';
import { CommentData } from '@/types/types';
import { Comment } from '../Comment/Comment';
import { CommentEditor } from '../CommentEditor/CommentEditor';

type ResponsesDrawerProps = {
  opened: boolean;
  close: () => void;
  user: UserData;
  articleSlug: string;
  comments: CommentData[];
};

export const ResponsesDrawer: FC<ResponsesDrawerProps> = ({
  opened,
  close,
  user,
  articleSlug,
  comments,
}) => {
  const hasComments = comments.length > 0;
  const title = hasComments ? `Responses (${comments.length})` : ' No responses yet';

  return (
    <Drawer opened={opened} onClose={close} title={title} position="right" size="sm">
      <CommentEditor articleSlug={articleSlug} user={user} />
      {hasComments && <Divider mt="xl" mb="xl" />}
      {hasComments &&
        comments.map((comment, index, commentsList) => (
          <Fragment key={comment.id}>
            <Comment comment={comment} />
            {commentsList.length !== index + 1 && <Divider mt="lg" mb="lg" />}
          </Fragment>
        ))}
    </Drawer>
  );
};
