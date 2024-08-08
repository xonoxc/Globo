import { AxiosResponse } from "axios"
import { userData } from "@/types"

export interface Data {
     user?: userData
     createdUser?: userData
     refreshToken?: string
     data?: { user: userData; refreshToken?: string }
     accessToken?: string
     success: boolean
     statusCode: number
     message: string
}

export interface ApiResponse extends AxiosResponse {
     user?: userData
     refreshToken?: string
     accessToken?: string
     data: {
          data?: {
               createdUser: userData
               user?: userData
          }
     }
}

export interface IUserProfile {
     id: string
     name: string
     email: string
     avatar: string
     isVerified: boolean
     createdAt: string
     updatedAt: string
     preferences: {
          proUser: boolean
          articleCount: number
          bio: string
     }
     article: string[]
}
