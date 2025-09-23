import { describe, expect, it } from 'vitest';

import * as articleApi from './article.api';
import * as articleMutations from './article.mutations';

describe('article mutations', () => {
  it('createArticleMutationOptions should return correct mutation options', () => {
    const options = articleMutations.createArticleMutationOptions();
    expect(options.mutationFn).toBe(articleApi.createArticle);
  });

  it('generateArticleMutationOptions should return correct mutation options', () => {
    const options = articleMutations.generateArticleMutationOptions();
    expect(options.mutationFn).toBe(articleApi.generateArticle);
  });

  it('updateArticleMutationOptions should return correct mutation options', () => {
    const options = articleMutations.updateArticleMutationOptions();
    expect(options.mutationFn).toBe(articleApi.updateArticle);
  });

  it('favoriteArticleMutationOptions should return correct mutation options', () => {
    const options = articleMutations.favoriteArticleMutationOptions();
    expect(options.mutationFn).toBe(articleApi.favoriteArticle);
  });

  it('unfavoriteArticleMutationOptions should return correct mutation options', () => {
    const options = articleMutations.unfavoriteArticleMutationOptions();
    expect(options.mutationFn).toBe(articleApi.unfavoriteArticle);
  });

  it('deleteArticleMutationOptions should return correct mutation options', () => {
    const options = articleMutations.deleteArticleMutationOptions();
    expect(options.mutationFn).toBe(articleApi.deleteArticle);
  });
});
