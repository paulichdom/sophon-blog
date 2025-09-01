import { FC, useState } from 'react';
import {
  Paper,
  Text,
  Group,
  ActionIcon,
  Stack,
  ThemeIcon,
  Anchor,
} from '@mantine/core';
import {
  IconBrain,
  IconCode,
  IconMovie,
  IconDeviceGamepad2,
  IconBrush,
  IconChevronRight,
  IconArrowRight,
} from '@tabler/icons-react';
import classes from './Category.module.css';

export interface CategoryItem {
  id: string;
  name: string;
  articleCount: number;
  icon: React.ReactNode;
  color: string;
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
    name: 'AI',
    articleCount: 123,
    icon: <IconBrain size={16} />,
    color: 'violet',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    articleCount: 98,
    icon: <IconCode size={16} />,
    color: 'blue',
  },
  {
    id: 'animation',
    name: 'Animation',
    articleCount: 76,
    icon: <IconMovie size={16} />,
    color: 'yellow',
  },
  {
    id: 'games',
    name: 'Games',
    articleCount: 54,
    icon: <IconDeviceGamepad2 size={16} />,
    color: 'green',
  },
  {
    id: 'design',
    name: 'Design',
    articleCount: 42,
    icon: <IconBrush size={16} />,
    color: 'pink',
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
      <Text size="xl" fw={700} mb="xl" c="dimmed">
        Trending Topics
      </Text>
      
      <Paper p="xl" radius="xl" className={classes.categoryContainer}>
        <Stack gap="md">
          {categories.map((category) => {
            const isSelected = activeId === category.id;
            return (
              <Group
                key={category.id}
                justify="space-between"
                className={`${classes.categoryItem} ${isSelected ? classes.categoryItemSelected : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Group gap="md">
                  <ThemeIcon
                    size="lg"
                    radius="xl"
                    variant="light"
                    color={category.color}
                    className={classes.categoryIcon}
                  >
                    {category.icon}
                  </ThemeIcon>
                  <div>
                    <Text fw={600} size="sm" c={isSelected ? "bright" : "bright"}>
                      {category.name}
                    </Text>
                    <Text size="xs" c={isSelected ? category.color : "dimmed"}>
                      {category.articleCount} Articles
                    </Text>
                  </div>
                </Group>
                
                <ActionIcon 
                  variant="transparent" 
                  c={isSelected ? category.color : "dimmed"} 
                  size="sm"
                >
                  <IconChevronRight size={16} />
                </ActionIcon>
              </Group>
            );
          })}
          
          <Group justify="center" pt="sm">
            <Anchor
              size="sm"
              fw={500}
              className={classes.showAllLink}
              onClick={onShowAllClick}
            >
              <Group gap={4}>
                Show all topics
                <IconArrowRight size={14} />
              </Group>
            </Anchor>
          </Group>
        </Stack>
      </Paper>
    </div>
  );
};
