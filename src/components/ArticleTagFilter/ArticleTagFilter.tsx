import { FC } from 'react';
import { Group, Text, ActionIcon } from '@mantine/core';
import { IconFilter, IconX } from '@tabler/icons-react';
import classes from './ArticleTagFilter.module.css';

export interface ArticleTagFilterProps {
  selectedTag?: string;
  onClearFilter?: () => void;
}

export const ArticleTagFilter: FC<ArticleTagFilterProps> = ({
  selectedTag,
  onClearFilter,
}) => {
  if (!selectedTag) {
    return null;
  }

  return (
    <div className={classes.filterContainer}>
      <Group justify="space-between" align="center">
        <Group gap="xs">
          <IconFilter className={classes.filterIcon} size={20} />
          <Text size="xl" fw={700} c="bright">
            Showing results for: <span className={classes.selectedTag}>{selectedTag}</span>
          </Text>
        </Group>
        
        <ActionIcon
          variant="transparent"
          onClick={onClearFilter}
          className={classes.clearButton}
          size="sm"
        >
          <Group gap={4}>
            <IconX size={16} />
            <Text size="sm" c="dimmed">
              Clear filter
            </Text>
          </Group>
        </ActionIcon>
      </Group>
    </div>
  );
};
