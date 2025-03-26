import { FC } from 'react';
import { Badge, Flex } from '@mantine/core';

export type ArticleCardTagListProps = {
  tags: string[];
};

export const ArticleCardTagList: FC<ArticleCardTagListProps> = ({ tags }) => {
  const hasTruncatedTags = tags.length > 3;
  const displayedTags = hasTruncatedTags ? tags.slice(0, 3) : tags;
  return (
    <Flex gap="xs" justify="flex-start" align="center" direction="row" wrap="wrap">
      {displayedTags.map((tag, index) => (
        <Badge key={index} w="fit-content" variant="outline" mt="xs">
          {tag}
        </Badge>
      ))}
      {hasTruncatedTags && (
        <Badge w="fit-content" variant="outline" mt="xs">
          +{tags.length - displayedTags.length}
        </Badge>
      )}
    </Flex>
  );
};

