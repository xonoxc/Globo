import { apiClient } from "../config/axios.config"
import Service from "./base"

class Stats extends Service {
     constructor() {
          super()
     }

     public async getStats(postId: string) {
          const response = await apiClient.get(
               `${this.serverUrl}/p/sts/${postId}`
          )
          return response.data.data
     }

     public async toggleLike(postId: string) {
          const response = await apiClient.post(
               `${this.serverUrl}/p/sts/like`,
               { postId }
          )

          return response
     }

     public async addComment(
          content: string,
          postId: string,
          parentId?: string
     ) {
          const response = await apiClient.post(
               `${this.serverUrl}/p/comments/${postId}`,
               { content, parentId }
          )

          return response
     }

     public async getComments(postId: string) {
          const response = await apiClient.get(
               `${this.serverUrl}/p/comments/${postId}`
          )

          return response.data.data
     }

     public async getCommentReplies(postId: string) {
          const response = await apiClient.get(
               `${this.serverUrl}/p/comments/${postId}`
          )

          return response.data.data
     }

     public async deleteComment(commentId: string) {
          const response = await apiClient.delete(
               `${this.serverUrl}/p/comments/${commentId}`
          )
          return response
     }
}

export const statsistics = new Stats()
