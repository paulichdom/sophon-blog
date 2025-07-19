import { followUserProfile, unfollowUserProfile, updateUserProfile } from './profile.api';

export const followUserProfileMutationOptions = () => ({
  mutationFn: followUserProfile,
});

export const unfollowUserProfileMutationOptions = () => ({
  mutationFn: unfollowUserProfile,
});

export const updateUserProfileMutationOptions = () => ({
  mutationFn: updateUserProfile,
});
