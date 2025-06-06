import { FC, Fragment } from 'react';
import { Divider, Drawer } from '@mantine/core';
import { CommentData } from '@/types/types';
import { Comment } from '../Comment/Comment';
import { CommentEditor } from '../CommentEditor/CommentEditor';

type ResponsesDrawerProps = {
  opened: boolean;
  close: () => void;
  articleSlug: string;
  comments: CommentData[];
};

export const ResponsesDrawer: FC<ResponsesDrawerProps> = ({
  opened,
  close,
  articleSlug,
  comments,
}) => {
  const hasComments = comments.length > 0;
  const title = hasComments ? `Responses (${comments.length})` : ' No responses yet';

  return (
    <Drawer opened={opened} onClose={close} title={title} position="right" size="sm">
      <CommentEditor articleSlug={articleSlug} />
      {hasComments && <Divider mt="xl" mb="xl" />}
      {hasComments &&
        comments.map((comment, index, commentsList) => (
          <Fragment>
            <Comment key={comment.id} comment={comment} />
            {commentsList.length !== index + 1 && <Divider mt="lg" mb="lg" />}
          </Fragment>
        ))}
    </Drawer>
  );
};
