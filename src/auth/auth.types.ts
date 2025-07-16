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

export type UserDto = {
  user: UserData;
};

export type UserData = {
  id: number;
  username: string;
  email: string;
  token?: string;
  bio?: null;
  image?: null;
};
