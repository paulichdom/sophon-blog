import { loginUser } from "./auth.api";

export const loginMutationOptions = () => ({
  mutationFn: loginUser,
});


