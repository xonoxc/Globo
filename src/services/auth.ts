import axios from "axios"
import Service from "./base"
import { apiClient } from "../config/axios.config"
import { ApiResponse } from "@/types/apiResponse"
import { userData } from "../types"
import { UpdateUserProps } from "../types/user"

class AuthService extends Service {
     constructor() {
          super()
     }

     private formatFormData(payload: any): FormData {
          const formData = new FormData()
          Object.keys(payload).forEach(key => {
               const value = payload[key]
               if (value !== undefined && value !== null) {
                    if (value instanceof File) {
                         formData.append(key, value)
                    } else if (value instanceof FileList) {
                         Array.from(value).forEach(file => {
                              formData.append(key, file)
                         })
                    } else if (typeof value === "object") {
                         formData.append(key, JSON.stringify(value))
                    } else {
                         formData.append(key, String(value))
                    }
               }
          })

          return formData
     }
     public async createAccount(
          name: string,
          email: string,
          password: string,
          profile?: FileList | File,
          coverImage?: File | FileList
     ): Promise<userData> {
          const response = await axios.post(
               `${this.serverUrl}/usr/auth/signup`,
               {
                    name,
                    email,
                    password,
                    profile,
                    coverImage,
               },
               {
                    headers: {
                         "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
               }
          )

          return response.data.data?.createdUser
     }

     public async login(email: string, password: string): Promise<ApiResponse> {
          const response = await axios.post(
               `${this.serverUrl}/usr/auth/login`,
               {
                    email,
                    password,
               },
               {
                    headers: {
                         "Content-Type": "application/json",
                    },
                    withCredentials: true,
               }
          )

          return response
     }

     public async editUserProfile(props: UpdateUserProps): Promise<any> {
          const formData = this.formatFormData(props)

          const response = await apiClient.patch(
               `${this.serverUrl}/usr/c`,
               formData,
               {
                    headers: {
                         "Content-Type": "multipart/form-data",
                    },
               }
          )

          return response.data.data
     }

     public async getCurrentUser(): Promise<userData> {
          const response: ApiResponse = await apiClient.get(
               `${this.serverUrl}/usr/c`
          )

          return response.data.data?.user as userData
     }

     public async getUserProfile(userId: string): Promise<any> {
          const response = await apiClient.get(
               `${this.serverUrl}/usr/p/${userId}`
          )

          return response.data.data.profile
     }

     public async logOut(): Promise<ApiResponse> {
          const response: ApiResponse = await apiClient.post(
               `${this.serverUrl}/usr/auth/logout`
          )

          return response
     }

     public async getSubscription(userId: string): Promise<boolean> {
          const responsse = await apiClient.get(
               `${this.serverUrl}/usr/c/sub/${userId}`
          )

          return responsse.data.data.proUser as boolean
     }
}

export const authService = new AuthService()
