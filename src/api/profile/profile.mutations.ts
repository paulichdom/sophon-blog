import { followUserProfile, unfollowUserProfile } from './profile.api';

export const followUserProfileMutationOptions = () => ({
  mutationFn: followUserProfile,
});

export const unfollowUserProfileMutationOptions = () => ({
  mutationFn: unfollowUserProfile,
});
