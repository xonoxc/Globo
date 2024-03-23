import { createSlice } from "@reduxjs/toolkit"
import { userData } from "../types"

interface AuthState {
  status: boolean
  userData: userData | null
}

const initialState = {
  status: false,
  userData: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action) => {
      state.status = true
      state.userData = action.payload
    },
    logout: (state: AuthState) => {
      state.status = false
      state.userData = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
