import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    signinStart: (state) => {
      state.isFetching = true;
    },
    signinSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signinFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    tryAgain: (state) => {
      state.error = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  tryAgain,
  signOut,
} = userSlice.actions;
export default userSlice.reducer;
