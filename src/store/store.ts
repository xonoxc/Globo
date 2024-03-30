import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"

const store = configureStore({
  reducer: {
    auth: authSlice,
    // TODO: add more reducers for post
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
