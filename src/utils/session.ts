import { logout, validate } from "@/reducers/authSlice.ts";
import { Dispatch } from "@reduxjs/toolkit";

import { accessTokenKey, authSessionKey } from "@/utils/constants.ts";

export const getSession = () => {
  let credentials;
  try {
    credentials = JSON.parse(localStorage.getItem(authSessionKey)!);
    if (!Object.keys(credentials).includes(accessTokenKey)) {
      credentials = null;
    }
  } catch {
    credentials = null;
  }
  return credentials;
};

export const createSession = (token: any) => {
  localStorage.setItem(authSessionKey, JSON.stringify(token));
};

export const destroySession = () => {
  localStorage.removeItem(authSessionKey);
};

export const validateSession = async (dispatch: Dispatch) => {
  const session = await getSession();
  if (!session) {
    dispatch(logout());
  } else {
    dispatch(validate({ user: session.user, token: session.accessToken }));
  }
};
