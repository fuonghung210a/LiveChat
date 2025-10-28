import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/src/store/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Thêm reducer khác tương tự trong đây!
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
