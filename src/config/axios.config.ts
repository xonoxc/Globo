import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios"
import env from "./config"
import store from "../store/store"
import { jwtDecode } from "jwt-decode"
import { logout, setRefreshToken } from "../store/authSlice"

const apiClient = axios.create({
     withCredentials: true,
})

apiClient.interceptors.response.use(
     (response: AxiosResponse) => response,
     async (error: AxiosError) => {
          const originalRequest = error.config as AxiosRequestConfig

          if (error.response && error.response.status === 401) {
               const { refreshToken, refreshTokenExpiry } =
                    store.getState().auth

               if (
                    refreshToken &&
                    refreshTokenExpiry &&
                    Date.now() >= refreshTokenExpiry
               ) {
                    try {
                         const response = await apiClient.post(
                              `${env?.VITE_SERVER_URL}/auth/refresh-token`
                         )

                         if (response.status === 200) {
                              const newRefreshtoken = response.data.refreshToken
                              const { exp } = jwtDecode<{ exp: number }>(
                                   newRefreshtoken
                              )

                              store.dispatch(
                                   setRefreshToken({
                                        newRefreshtoken,
                                        refreshTokenExpiry: exp * 1000,
                                   })
                              )

                              return apiClient(originalRequest)
                         }
                    } catch (refreshError) {
                         console.error(
                              "Error while refreshing token:",
                              refreshError
                         )
                         store.dispatch(logout())
                    }
               } else {
                    store.dispatch(logout())
               }
          }
          return Promise.reject(error)
     }
)

export { apiClient }
