import { API_URL } from '@/shared/api.config';
import fetch from '@/shared/client';
import { TagsDto } from '@/types/types';

export const fetchAllTags = async () => {
  const url = new URL(`${API_URL}/tags`);
  const tags: TagsDto = await fetch(url.toString(), {
    method: 'GET',
  });

  return tags;
};
