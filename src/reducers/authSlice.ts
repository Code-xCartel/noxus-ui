import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/utils/types.ts";

type State = {
  isAuthenticated: boolean;
  user: User;
  token: string;
};

const initialState: State = {
  isAuthenticated: false,
  user: {
    noxId: "",
    email: "",
    username: "",
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = { avatar: "", email: "", noxId: "", username: "" };
      state.token = "";
      state.isAuthenticated = false;
    },
    validate: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, validate } = authSlice.actions;
export default authSlice.reducer;
