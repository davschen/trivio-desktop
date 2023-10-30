import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  authenticated: false,
  username: null,
  name: null,
  UUID: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    signIn: (state, action) => {
      state.authenticated = true;
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.UUID = action.payload.UUID;
    },
    signOut: (state) => {
      return initialUserState;
    }
  }
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;