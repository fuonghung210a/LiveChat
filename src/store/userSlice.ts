import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  token: string;
  loggedIn: boolean;
}

const initialState: UserState = {
  name: "",
  email: "",
  token: "",
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ name: string; email: string; token: string }>,
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.token = "";
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
