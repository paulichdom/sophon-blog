import { queryOptions } from '@tanstack/react-query';
import { fetchAllTags } from './tags.api';

export const allTagsQueryOptions = queryOptions({
  queryKey: ['tags'],
  queryFn: () => fetchAllTags(),
});
