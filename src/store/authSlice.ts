import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = { name: string; email?: string } | null;

interface AuthState {
  token: string | null;
  user: User;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ token: string; user: { name: string; email?: string } }>
    ) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
