export type LoginUserData = {
  email: string;
  password: string;
};

export type LoginUserDto = {
  user: LoginUserData;
};

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

export type RegisterUserDto = {
  user: RegisterUserData;
};

export type UserData = {
  email: string;
  token: string;
  username: string;
  bio: null;
  image: null;
};
