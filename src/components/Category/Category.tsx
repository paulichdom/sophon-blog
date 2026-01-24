import { FC, useEffect, useMemo, useState } from 'react';
import { Button, Group, Paper, Title } from '@mantine/core';
import classes from './Category.module.css';

export type CategoryOption = {
  value: string;
  label: string;
};

export const DEFAULT_CATEGORY_VALUE = 'general';

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { value: 'css', label: 'CSS' },
  { value: 'react', label: 'React' },
  { value: 'animation', label: 'Animation' },
  { value: 'career', label: 'Career' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'svg', label: 'SVG' },
  { value: 'nextjs', label: 'Next.js' },
  { value: DEFAULT_CATEGORY_VALUE, label: 'General' },
];

export interface CategoryProps {
  value?: string | null;
  onChange?: (categoryValue: string) => void;
  options?: CategoryOption[];
}

export const Category: FC<CategoryProps> = ({ value, onChange, options = CATEGORY_OPTIONS }) => {
  const fallbackValue = useMemo(() => {
    const defaultOption = options.find((option) => option.value === DEFAULT_CATEGORY_VALUE);
    return defaultOption?.value ?? options[0]?.value ?? DEFAULT_CATEGORY_VALUE;
  }, [options]);

  const [internalValue, setInternalValue] = useState<string>(value ?? fallbackValue);

  useEffect(() => {
    if (value && value !== internalValue) {
      setInternalValue(value);
      return;
    }
    if ((value === null || value === undefined) && internalValue !== fallbackValue) {
      setInternalValue(fallbackValue);
    }
  }, [value, internalValue, fallbackValue]);

  const activeValue = value ?? internalValue;

  const handleChange = (nextValue: string | null) => {
    const resolvedValue = nextValue ?? fallbackValue;
    setInternalValue(resolvedValue);
    onChange?.(resolvedValue);
  };

  return (
    <div className={classes.categoryWrapper}>
      <Title order={6} pt={4} mb="md" className={classes.sectionLabel}>
        BROWSE BY CATEGORY
      </Title>
      <Group gap="sm" wrap="wrap">
        {options.map((option) => {
          const isActive = activeValue === option.value;
          return (
            <Button
              key={option.value}
              size="compact-md"
              variant="default"
              onClick={() => handleChange(option.value)}
              aria-pressed={isActive}
            >
              {option.label}
            </Button>
          );
        })}
      </Group>
    </div>
  );
};
