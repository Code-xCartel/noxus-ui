export type apiError = {
  status: number;
  data: {
    error: string;
  };
};

export type User = {
  noxId: string;
  email: string;
  username: string;
  avatar?: string;
};

export type UserInfo = {
  access_token: string;
  token_type: string;
  user: User;
};

export type Friend = {
  noxId: string;
  username: string;
  status?: string;
  avatar?: string;
};

export type NoxusUser = {
  username: string;
  noxId: string;
  avatar?: string;
};
