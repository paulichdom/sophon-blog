import { updateUser } from './user.api';

export const updateUserMutationOptions = () => ({
  mutationFn: updateUser,
});
