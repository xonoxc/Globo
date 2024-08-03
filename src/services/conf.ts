import env from "../config/config"
import { apiClient } from "../config/axios.config"
import { PostProps } from "@/types"

class PostService {
     private serverUrl: string

     constructor() {
          this.serverUrl = env?.VITE_SERVER_URL as string
     }

     private formatFormData(payload: any): FormData {
          const formData = new FormData()

          Object.keys(payload).forEach((key) => {
               const value = payload[key]

               if (value !== undefined && value !== null) {
                    if (
                         typeof value === "object" &&
                         value instanceof FileList
                    ) {
                         Array.from(value).forEach((file) => {
                              formData.append(key, file)
                         })
                    } else {
                         formData.append(key, value.toString())
                    }
               }
          })

          return formData
     }

     public async createPost(payload: PostProps): Promise<any> {
          const formData = this.formatFormData(payload)

          const response = await apiClient.post(
               `${this.serverUrl}/p`,
               formData,
               {
                    headers: {
                         "Content-Type": "multipart/form-data",
                    },
               }
          )

          return response.data.data.newPost
     }

     public async getPostById(id: string): Promise<any> {
          const response = await apiClient.get(`${this.serverUrl}/p/${id}`)

          return response.data.data.post
     }

     public async getUserPosts(): Promise<any> {
          const response = await apiClient.get(`${this.serverUrl}/p`)

          return response.data.data.posts
     }

     public async updatePost(payload: PostProps, postId: string): Promise<any> {
          const fromData = this.formatFormData(payload)

          const response = await apiClient.patch(
               `${this.serverUrl}/p/patch/${postId}`,
               fromData,
               {
                    headers: {
                         "Content-Type": "multipart/form-data",
                    },
               }
          )

          return response.data.data.updatedPost
     }

     public async getFeed(): Promise<any> {
          const response = await apiClient.get(`${this.serverUrl}/p/f/refresh`)

          return response.data.data.data
     }

     public async getPreviewImage(postId: string): Promise<string> {
          const response = await apiClient.get(`${this.serverUrl}/p/i/prev`, {
               params: {
                    postId,
               },
          })

          return response.data.image_url
     }

     public async deletePost(id: number): Promise<boolean> {
          const response = await apiClient.delete(`${this.serverUrl}/p/${id}`)

          if (response.status === 200) {
               return true
          }

          return false
     }
}

export const postService = new PostService()
