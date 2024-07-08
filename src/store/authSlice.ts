import { createSlice } from "@reduxjs/toolkit"
import { userData } from "../types"
import { PayloadAction } from "@reduxjs/toolkit/react"

interface AuthState {
     status: boolean
     userData: userData | null
     refreshToken: string | null
}

const getInitialState = (): AuthState => {
     const initialUserData = localStorage.getItem("userData")
     const refreshToken = localStorage.getItem("refreshToken")

     if (initialUserData && refreshToken) {
          return {
               status: true,
               userData: JSON.parse(initialUserData),
               refreshToken: refreshToken,
          }
     }

     return {
          status: false,
          userData: null,
          refreshToken: null,
     }
}

const authSlice = createSlice({
     name: "auth",
     initialState: getInitialState(),
     reducers: {
          login: (
               state: AuthState,
               action: PayloadAction<{ user: userData }>
          ): void => {
               state.status = true
               state.userData = action.payload.user
               localStorage.setItem(
                    "userData",
                    JSON.stringify({
                         id: action.payload.user.id,
                         name: action.payload.user.name,
                         email: action.payload.user.email,
                         avatar: action.payload.user.avatar || "",
                         coverImage: action.payload.user.coverImage || "",
                    })
               )
          },
          logout: (state: AuthState): void => {
               state.status = false
               state.userData = null
               localStorage.removeItem("userData")
               localStorage.removeItem("refreshToken")
               localStorage.removeItem("cachedPosts")
          },
          setRefreshToken: (
               state: AuthState,
               action: PayloadAction<{ newRefreshtoken: string }>
          ): void => {
               state.refreshToken = action.payload.newRefreshtoken
               localStorage.setItem("userData", JSON.stringify(state.userData))
          },
     },
})

export const { login, logout, setRefreshToken } = authSlice.actions

export default authSlice.reducer
