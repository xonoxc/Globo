import { apiClient } from "../config/axios.config"
import Service from "./base"

class Comments extends Service {
     constructor() {
          super()
     }

     public async addComment(
          content: string,
          postId: string,
          parentId?: string
     ) {
          const response = await apiClient.post(
               `${this.serverUrl}/comments/${postId}`,
               { content, parentId }
          )

          return response.data
     }

     public async getComments(postId: string) {
          const response = await apiClient.get(
               `${this.serverUrl}/comments/${postId}`
          )

          return response.data.data
     }

     public async getCommentReplies(commentId: string) {
          const response = await apiClient.get(
               `${this.serverUrl}/comments/co/${commentId}`
          )

          return response.data.data
     }

     public async deleteComment(commentId: string) {
          const response = await apiClient.delete(
               `${this.serverUrl}/comments/co/${commentId}`
          )
          return response
     }
}

export const cmt = new Comments()
