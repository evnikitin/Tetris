import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './ApiSlices';

type AuthState = {
  user: User | null,
  token: string | null
};

export type RootState = {
  auth: AuthState
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials:
    (state: AuthState, action: PayloadAction<{ user: User, accessToken: string }>) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state: AuthState) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
