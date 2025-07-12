import { FC } from 'react';
import { Avatar, DefaultMantineColor, MantineRadius, MantineSize } from '@mantine/core';

type UserAvatarProps = {
  username: string;
  sourceImage?: string | null;
  altText: string;
  radius?: MantineRadius | undefined;
  color?: DefaultMantineColor | 'initials';
  size?: number | MantineSize | (string & {});
};

export const UserAvatar: FC<UserAvatarProps> = ({
  username,
  sourceImage = null,
  altText,
  radius = 'md',
  color = 'initials',
  size = 'md',
}) => {
  return (
    <Avatar
      src={sourceImage}
      color={color}
      radius={radius}
      alt={altText}
      size={size}
      name={username}
    />
  );
};
