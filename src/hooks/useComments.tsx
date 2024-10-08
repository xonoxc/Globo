import { createContext, useContext, useState } from "react"
import { cmt } from "../services/comments"
import { statsistics } from "../services/stats"

type Author = { id: string; name: string; avatar: string }

export interface Comment {
     id: string
     user: Author
     content: string
     createdAt: string
     parentId?: string
     _count: {
          likes: string
          replies: string
     }
     userId: string
}

interface CommentsContextProps {
     comments: Comment[]
     addComment: (
          content: string,
          postId: string,
          parentId?: string
     ) => Promise<void>
     deleteComment: (id: string) => Promise<void>
     toggleCommentLike: (id: string) => Promise<void>
     fetchComments: (postId: string) => Promise<void>
     fetchReplies: (commentId: string) => Promise<Comment[]>
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

               console.log("response.data", response)

               if (response.statusCode === 200) {
                    setComments(prev => [response.data, ...prev])
               }
          } catch (error) {
               console.error("Error adding comment:", error)
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

     const deleteComment = async (id: string) => {
          try {
               const response = await cmt.deleteComment(id)
               if (response.status === 200) {
                    setComments(prev =>
                         prev.filter(comment => comment.id !== id)
                    )
               }
          } catch (error) {
               console.error("Error deleting comment:", error)
          }
     }

     const toggleCommentLike = async (id: string) => {
          try {
               const response = await statsistics.toggleCommentLike(id)
               if (response.status === 200) {
                    setComments(prev =>
                         prev.map(comment =>
                              comment.id === id
                                   ? {
                                          ...comment,
                                          _count: {
                                               ...comment._count,
                                               likes:
                                                    comment._count.likes === "1"
                                                         ? "0"
                                                         : "1",
                                          },
                                     }
                                   : comment
                         )
                    )
               }
          } catch (error) {
               console.error("Error toggling like:", error)
          }
     }

     const fetchReplies = async (commentId: string): Promise<Comment[]> => {
          try {
               const response = await cmt.getCommentReplies(commentId)

               if (response) {
                    return response
               }
               return []
          } catch (error) {
               console.error("Error fetching replies:", error)
               return []
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
                    fetchReplies,
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
