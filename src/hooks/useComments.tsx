import { createContext, useContext, useState } from "react"
import { cmt } from "../services/comments"
import { statsistics } from "../services/stats"

type Author = { id: string; name: string; avatar: string }

export interface Comment {
     id: string
     user: Author
     content: string
     createdAt: string
     articleId: string
     parentId?: string
     _count: {
          likes: string
          replies: string
     }
     replies: Comment[]
     userId: string
}

interface CommentsContextProps {
     comments: Comment[]
     addComment: (
          content: string,
          postId: string,
          parentId?: string
     ) => Promise<Comment>
     deleteComment: (id: string, parentId?: string) => Promise<void>
     toggleCommentLike: (id: string, articleId: string) => Promise<void>
     fetchComments: (postId: string) => Promise<void>
     getLikedStatus: (commentId: string) => Promise<any>
}

const commentContext = createContext<CommentsContextProps | undefined>(
     undefined
)

export const CommentsProvider = ({
     children,
}: {
     children: React.ReactNode
}) => {
     const [comments, setComments] = useState<Comment[]>([])

     const addComment = async (
          content: string,
          postId: string,
          parentId?: string
     ) => {
          try {
               const response = await cmt.addComment(content, postId, parentId)
               if (response.statusCode === 200) {
                    if (!parentId) {
                         setComments(prev => [response.data, ...prev])
                    } else {
                         return response.data
                    }
               }
          } catch (error) {
               throw error
          }
     }

     const fetchComments = async (postId: string) => {
          try {
               const response = await cmt.getComments(postId)
               if (response) {
                    setComments(response.comments)
               }
          } catch (error) {
               console.error("Error fetching comments:", error)
          }
     }

     const deleteComment = async (id: string, parentId?: string) => {
          try {
               const response = await cmt.deleteComment(id)
               if (response.status === 200) {
                    if (!parentId) {
                         setComments(prev =>
                              prev.filter(comment => comment.id !== id)
                         )
                    }
               }
          } catch (error) {
               console.error("Error deleting comment:", error)
          }
     }

     const toggleCommentLike = async (id: string, articledId: string) => {
          try {
               await statsistics.toggleCommentLike(id, articledId)
          } catch (error) {
               console.error("Error toggling like:", error)
          }
     }

     const getLikedStatus = async (commentId: string): Promise<any> => {
          try {
               return await cmt.getCommentLikeStatus(commentId)
          } catch (error) {
               console.error("Error fetching replies:", error)
          }
     }

     return (
          <commentContext.Provider
               value={{
                    comments,
                    addComment,
                    deleteComment,
                    toggleCommentLike,
                    fetchComments,
                    getLikedStatus,
               }}
          >
               {children}
          </commentContext.Provider>
     )
}

export const useComments = () => {
     const context = useContext(commentContext)
     if (context === undefined) {
          throw new Error("useComments must be used within a CommentsProvider")
     }
     return context
}
