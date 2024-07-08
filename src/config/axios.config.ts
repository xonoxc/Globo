import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from "axios"
import env from "./config"
import store from "../store/store"
import { logout, setRefreshToken } from "../store/authSlice"

const apiClient = axios.create({
     withCredentials: true,
})

apiClient.interceptors.response.use(
     (response: AxiosResponse) => response,
     async (error: AxiosError) => {
          const originalRequest = error.config as AxiosRequestConfig

          if (error.response && error.response.status === 401) {
               const refreshToken = store.getState().auth.refreshToken

               if (refreshToken) {
                    try {
                         const response = await apiClient.post(
                              `${env?.VITE_SERVER_URL}/auth/refresh-token`
                         )

                         if (response.status == 200) {
                              store.dispatch(
                                   setRefreshToken({
                                        newRefreshtoken:
                                             response.data.refreshToken,
                                   })
                              )
                         }

                         return apiClient(originalRequest)
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
