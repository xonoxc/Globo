import { createSlice } from "@reduxjs/toolkit"
import { userData } from "../types"
import { jwtDecode } from "jwt-decode"
import { PayloadAction } from "@reduxjs/toolkit/react"

interface AuthState {
     status: boolean
     userData: userData | null
     refreshToken: string | null
     refreshTokenExpiry: number | null
}

const getInitialState = (): AuthState => {
     try {
          const storedUserData = localStorage.getItem("userData")
          const parsedUserData = JSON.parse(storedUserData as string)
          const refreshToken = parsedUserData?.refreshToken

          if (refreshToken) {
               const { exp } = jwtDecode<{ exp: number }>(refreshToken)

               if (Date.now() < exp * 1000) {
                    return {
                         status: true,
                         userData: parsedUserData,
                         refreshToken: refreshToken,
                         refreshTokenExpiry: exp * 1000,
                    }
               }
          }

          return {
               status: false,
               userData: null,
               refreshToken: null,
               refreshTokenExpiry: null,
          }
     } catch (error) {
          console.error("error while recovering authState:", error)
          return {
               status: false,
               userData: null,
               refreshToken: null,
               refreshTokenExpiry: null,
          }
     }
}

const authSlice = createSlice({
     name: "auth",
     initialState: getInitialState(),
     reducers: {
          login: (
               state: AuthState,
               action: PayloadAction<{
                    user: userData
                    refreshToken?: string
                    refreshTokenExpiry?: number
               }>
          ): void => {
               state.status = true
               state.userData = action.payload.user
               state.refreshToken = action.payload.refreshToken || null
               state.refreshTokenExpiry =
                    action.payload.refreshTokenExpiry || null
               localStorage.setItem("userData", JSON.stringify(state.userData))
          },
          logout: (state: AuthState): void => {
               state.status = false
               state.userData = null
               state.refreshToken = null
               state.refreshTokenExpiry = null
               localStorage.removeItem("userData")
               localStorage.removeItem("cachedPosts")
          },
          setRefreshToken: (
               state: AuthState,
               action: PayloadAction<{
                    newRefreshtoken: string
                    refreshTokenExpiry: number
               }>
          ): void => {
               state.refreshToken = action.payload.newRefreshtoken
               state.refreshTokenExpiry = action.payload.refreshTokenExpiry
               localStorage.setItem("userData", JSON.stringify(state.userData))
          },
     },
})

export const { login, logout, setRefreshToken } = authSlice.actions

export default authSlice.reducer
