import { FC, useRef } from 'react';
import cx from 'clsx';
import {
  Button,
  Group,
  ScrollArea,
  Skeleton,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Tags.module.css';

export interface TagsProps {
  onChange: (tag: string) => void;
  tags?: string[];
  isLoading?: boolean;
}

const skeletonWidths = [
  72,
  64,
  88,
  54,
  96,
  70,
  82,
  60,
  92,
  56,
  78,
  66,
  90,
  58,
  84,
];

export const Tags: FC<TagsProps> = ({ tags = [], onChange, isLoading = false }) => {
  const theme = useMantineTheme();
  const isSmUp = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
  const isMdUp = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const buttonSize = isMdUp ? 'compact-md' : isSmUp ? 'compact-md' : 'compact-sm';
  const skeletonHeight = isMdUp ? 28 : isSmUp ? 26 : 24;
  const groupGap = isMdUp ? 'sm' : 'xs';
  const groupJustify = isMdUp ? 'flex-start' : 'center';
  const labelAlign = 'left';
  const wrapperClassName = cx(classes.categoryWrapper, {
    [classes.categoryWrapperCompact]: !isMdUp,
  });

  const visibleTags = tags.slice(0, 25);

  const renderSkeletons = () =>
    skeletonWidths.map((width, index) => (
      <Skeleton key={`tag-skeleton-${index}`} width={width} height={skeletonHeight} radius="xl" />
    ));

  const renderTags = () =>
    visibleTags.map((tag) => (
      <Button
        key={tag}
        size={buttonSize}
        variant="default"
        onClick={() => onChange(tag)}
        aria-label={`Filter by ${tag}`}
        className={cx({ [classes.tagButtonCompact]: !isMdUp })}
      >
        {tag}
      </Button>
    ));

  const hasTags = visibleTags.length > 0;
  const shouldScroll = !isMdUp && (isLoading || hasTags);

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!shouldScroll) {
      return;
    }

    const viewport = scrollViewportRef.current;
    if (!viewport) {
      return;
    }

    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = viewport.scrollLeft;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!shouldScroll || !isDraggingRef.current) {
      return;
    }

    const viewport = scrollViewportRef.current;
    if (!viewport) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;
    viewport.scrollLeft = dragStartScrollLeftRef.current - deltaX;
  };

  const handlePointerUp: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (!shouldScroll) {
      return;
    }

    isDraggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handlePointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    if (!shouldScroll) {
      return;
    }

    isDraggingRef.current = false;
  };

  const tagsContent = (
    <Group
      gap={groupGap}
      wrap={isMdUp ? 'wrap' : 'nowrap'}
      justify={isMdUp ? groupJustify : 'flex-start'}
      className={cx({ [classes.tagsRow]: !isMdUp })}
    >
      {isLoading && renderSkeletons()}
      {!isLoading && hasTags && renderTags()}
      {!isLoading && !hasTags && (
        <Text size="sm" c="dimmed" ta={labelAlign}>
          Tags will appear once editors start publishing.
        </Text>
      )}
    </Group>
  );

  return (
    <div className={wrapperClassName}>
      <Title
        order={6}
        pt={isMdUp ? 4 : 0}
        mb={isMdUp ? 'md' : 'sm'}
        className={cx(classes.sectionLabel, { [classes.sectionLabelCompact]: !isMdUp })}
        ta={labelAlign}
      >
        POPULAR TAGS
      </Title>
      {shouldScroll ? (
        <ScrollArea
          type="never"
          scrollbars="x"
          scrollbarSize={0}
          scrollHideDelay={400}
          styles={{ viewport: { overflowY: 'hidden' } }}
          className={classes.tagsScroll}
          viewportRef={scrollViewportRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={handlePointerLeave}
        >
          {tagsContent}
        </ScrollArea>
      ) : (
        tagsContent
      )}
    </div>
  );
};
