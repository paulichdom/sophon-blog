import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  followUserProfileMutationOptions,
  unfollowUserProfileMutationOptions,
} from '@/api/profile/profile.mutations';

type UseFollowUserProfileValue = {
  followingState: boolean;
  setFollowingState: React.Dispatch<React.SetStateAction<boolean>>;
  handleFollowUserProfile: () => void;
  followUserProfileIsPending: boolean;
  unfollowUserProfileIsPending: boolean;
};

export const useFollowUserProfile = (
  username: string,
  isFollowing: boolean
): UseFollowUserProfileValue => {
  const [followingState, setFollowingState] = useState<boolean>(isFollowing);
  const queryClient = useQueryClient();

  const { mutate: followUserProfile, isPending: followUserProfileIsPending } = useMutation(
    followUserProfileMutationOptions()
  );

  const { mutate: unfollowUserProfile, isPending: unfollowUserProfileIsPending } = useMutation(
    unfollowUserProfileMutationOptions()
  );

  const handleFollowUserProfile = () => {
    if (followingState) {
      unfollowUserProfile(username, {
        onSuccess: () => {
          setFollowingState(false);
          queryClient.invalidateQueries({ queryKey: ['profile', username] });
        },
      });
    } else {
      followUserProfile(username, {
        onSuccess: () => {
          setFollowingState(true);
          queryClient.invalidateQueries({ queryKey: ['profile', username] });
        },
      });
    }
  };

  return {
    followingState,
    setFollowingState,
    handleFollowUserProfile,
    followUserProfileIsPending,
    unfollowUserProfileIsPending,
  };
};
