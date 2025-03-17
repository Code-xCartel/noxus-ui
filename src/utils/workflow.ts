import { logout } from "@/reducers/authSlice.ts";
import { Dispatch } from "@reduxjs/toolkit";

import { destroySession } from "@/utils/session.ts";

export const workflowStarted = (dispatch: Dispatch) => {
  dispatch(logout());
  destroySession();
};
