import { FC, useState } from 'react';
import {
  Paper,
  Text,
  Stack,
} from '@mantine/core';
import classes from './Category.module.css';

export interface CategoryItem {
  id: string;
  name: string;
  articleCount: number;
}

export interface CategoryProps {
  categories?: CategoryItem[];
  onCategoryClick?: (categoryId: string) => void;
  onShowAllClick?: () => void;
  selectedCategoryId?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    articleCount: 123,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    articleCount: 98,
  },
  {
    id: 'animation',
    name: 'Animation',
    articleCount: 76,
  },
  {
    id: 'games',
    name: 'Game Development',
    articleCount: 54,
  },
  {
    id: 'design',
    name: 'UI/UX Design',
    articleCount: 42,
  },
  {
    id: 'web3',
    name: 'Web3',
    articleCount: 35,
  },
  {
    id: 'productivity',
    name: 'Productivity',
    articleCount: 28,
  },
];

export const Category: FC<CategoryProps> = ({
  categories = defaultCategories,
  onCategoryClick,
  onShowAllClick,
  selectedCategoryId,
}) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(null);

  // Use controlled selectedCategoryId if provided, otherwise use internal state
  const activeId = selectedCategoryId ?? internalSelectedId;

  const handleCategoryClick = (categoryId: string) => {
    if (!selectedCategoryId) {
      // Only manage internal state if not controlled
      setInternalSelectedId(categoryId === activeId ? null : categoryId);
    }
    onCategoryClick?.(categoryId);
  };

  return (
    <div className={classes.categoryWrapper}>
      <Paper p="md" radius="xl" className={classes.categoryContainer}>
        <Text size="xl" fw={700} mb="md" c="bright">
          Browse by Category
        </Text>

        <Stack gap="xs">
          {categories.map((category) => {
            const isSelected = activeId === category.id;
            return (
              <div
                key={category.id}
                className={`${classes.categoryItem} ${isSelected ? classes.categoryItemSelected : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Text fw={500} size="sm" c={isSelected ? "bright" : "dimmed"}>
                  {category.name}
                </Text>
              </div>
            );
          })}
        </Stack>
      </Paper>
    </div>
  );
};
