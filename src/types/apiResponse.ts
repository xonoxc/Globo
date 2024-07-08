import { AxiosResponse } from "axios"
import { userData } from "@/types"

interface Data {
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
     user?: unknown
     refreshToken?: string
     accessToken?: string
     data: Data
}
