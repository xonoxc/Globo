import axios from "axios"
import env from "../config/config"
import { apiClient } from "../config/axios.config"
import { ApiResponse, IUserProfile } from "@/types/apiResponse"
import { userData } from "@/types"

class AuthService {
     private serverURL: string

     constructor() {
          this.serverURL = env?.VITE_SERVER_URL as string
     }

     public async createAccount(
          name: string,
          email: string,
          password: string,
          profile?: FileList | File,
          coverImage?: File | FileList
     ): Promise<userData> {
          const response: ApiResponse = await axios.post(
               `${this.serverURL}/usr/auth/signup`,
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
          const response: ApiResponse = await axios.post(
               `${this.serverURL}/usr/auth/login`,
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

     public async getCurrentUser(): Promise<userData> {
          const response: ApiResponse = await apiClient.get(
               `${this.serverURL}/usr/c`
          )

          return response.data.data?.user as userData
     }

     public async getUserProfile(userId: string): Promise<IUserProfile> {
          const response = await apiClient.get(
               `${this.serverURL}/usr/p/${userId}`
          )

          return response.data.data.profile as IUserProfile
     }

     public async logOut(): Promise<ApiResponse> {
          const response: ApiResponse = await apiClient.post(
               `${this.serverURL}/usr/auth/logout`
          )

          return response
     }
}

export const authService = new AuthService()
