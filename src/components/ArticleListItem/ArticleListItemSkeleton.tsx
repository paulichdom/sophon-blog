import { FC } from 'react';
import { Box, Flex, Group, Skeleton, Stack } from '@mantine/core';
import classes from './ArticleListItem.module.css';

const TAG_WIDTHS = [68, 56, 48];

export const ArticleListItemSkeleton: FC = () => {
  return (
    <div className={classes.feedItem} aria-hidden="true">
      <Flex gap="lg" align="flex-start">
        <Box className={classes.avatarContainer}>
          <Skeleton width={40} height={40} radius="xl" />
        </Box>
        <Box className={classes.content} style={{ width: '100%' }}>
          <Stack gap="xs">
            <Group gap="xs" align="center">
              <Skeleton height={12} width={110} radius="md" />
              <Skeleton height={10} width={60} radius="md" />
            </Group>
            <Stack gap={8}>
              <Skeleton height={24} width="80%" radius="md" />
              <Skeleton height={18} width="60%" radius="md" />
            </Stack>
            <Skeleton height={16} width="90%" radius="md" />
            <Flex justify="space-between" align="center" mt="md">
              <Group gap="xs">
                {TAG_WIDTHS.map((width) => (
                  <Skeleton key={width} width={width} height={22} radius="xl" />
                ))}
              </Group>
              <Group gap="md" align="center">
                <Skeleton width={22} height={22} radius="xl" />
                <Skeleton width={22} height={22} radius="xl" />
              </Group>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </div>
  );
};
