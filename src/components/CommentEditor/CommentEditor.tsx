import { FC, useState } from 'react';
import { IconCheck, IconXboxX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { Button, Flex, Group, Text, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { createCommentMutationOptions } from '@/api/comment/comment.mutations';
import { UserData } from '@/auth/auth.types';
import { queryClient } from '@/queryClient';
import { CommentDto } from '@/types/types';
import { UserAvatar } from '../UserAvatar/UserAvatar';
import classes from './CommentEditor.module.css';

type CommentEditorProps = {
  articleSlug: string;
  user: UserData;
};

export const CommentEditor: FC<CommentEditorProps> = ({ articleSlug, user }) => {
  const [commentBody, setCommentBody] = useState<string>('');

  const { mutate: createComment, isPending: isCreateCommentPending } = useMutation(
    createCommentMutationOptions()
  );

  const handleCreateComent = () => {
    const createCommentNotificationId = notifications.show({
      loading: true,
      title: 'Comment article',
      message: 'Creating your comment',
      autoClose: false,
      withCloseButton: false,
    });

    const createCommentDto = {
      comment: {
        body: commentBody,
      },
    };

    createComment(
      { articleSlug, createCommentDto },
      {
        onSuccess: (commentDto: CommentDto) => {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
          setCommentBody('');

          notifications.update({
            id: createCommentNotificationId,
            color: 'teal',
            title: 'Comment created',
            message: `Your comment ${commentDto.comment.id} has been created`,
            icon: <IconCheck size={18} />,
            loading: false,
            autoClose: 2000,
          });
        },
        onError: (error) => {
          notifications.update({
            id: createCommentNotificationId,
            color: 'red',
            title: 'Create comment error',
            message: `Error occured while creating a comment: ${error.message}`,
            icon: <IconXboxX size={18} />,
            loading: false,
            autoClose: 2000,
          });
        },
      }
    );
  };

  const validCommentbody = commentBody.length > 3;
  const isRespondDisabled = !validCommentbody || isCreateCommentPending;
  return (
    <Flex direction="column" gap="md">
      <Group>
        <UserAvatar
          username={user.username}
          sourceImage={user.image}
          altText={user.username}
          size={42}
          radius={42}
          color="initials"
        />
        <div>
          <Text size="sm">{user.username}</Text>
        </div>
      </Group>
      <Textarea
        classNames={{
          input: classes.input,
        }}
        variant="filled"
        placeholder="What are your thoughts?"
        minRows={4}
        maxRows={4}
        disabled={isCreateCommentPending}
        value={commentBody}
        onChange={(event) => setCommentBody(event.currentTarget.value)}
      />
      <Flex justify="flex-end">
        <Button
          variant="light"
          radius="xl"
          disabled={isRespondDisabled}
          onClick={handleCreateComent}
        >
          Respond
        </Button>
      </Flex>
    </Flex>
  );
};
