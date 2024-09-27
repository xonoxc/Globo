import { createContext, useContext, useState } from "react"
import { cmt } from "../services/comments"
import { statsistics } from "../services/stats"

type Author = { id: string; name: string; avatar: string }

interface Comment {
     id: string
     user: Author
     content: string
     createdAt: string
     parentId?: string
     _count: {
          likes: string
          replies: string
     }
}

interface CommentsContextProps {
     comments: Comment[] | []
     addComment: (
          content: string,
          postId: string,
          parentId?: string
     ) => Promise<any>
     deleteComment: (id: string) => Promise<void>
     toggleCommentLike: (id: string) => Promise<void>
     fetchComments: (postId: string) => Promise<void>
}

const commentContext = createContext<CommentsContextProps>({
     comments: [],
     addComment: () => Promise.resolve(),
     deleteComment: () => Promise.resolve(),
     toggleCommentLike: () => Promise.resolve(),
     fetchComments: () => Promise.resolve(),
})

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
          const response = await cmt.addComment(content, postId, parentId)

          if (response.statusCode === 200) {
               comments.unshift(response.data)
          }
     }

     const fetchComments = async (postId: string) => {
          const response = await cmt.getComments(postId)

          if (response) {
               setComments(response.comments)
          }
     }

     const deleteComment = async (id: string) => {
          const response = await cmt.deleteComment(id)
          if (response.status === 200) {
               setComments(comments.filter(comment => comment.id !== id))
          }
     }

     const toggleCommentLike = async (id: string) => {
          const response = await statsistics.toggleCommentLike(id)
          if (response.status === 200) {
               setComments(
                    comments.map(comment =>
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
     }

     return (
          <commentContext.Provider
               value={{
                    comments,
                    addComment,
                    deleteComment,
                    toggleCommentLike,
                    fetchComments,
               }}
          >
               {children}
          </commentContext.Provider>
     )
}

export const useComments = () => {
     const context = useContext(commentContext)
     if (!context) {
          throw new Error("useComments must be used within a CommentsProvider")
     }

     const {
          comments,
          addComment,
          deleteComment,
          toggleCommentLike,
          fetchComments,
     } = context

     return {
          comments,
          addComment,
          deleteComment,
          toggleCommentLike,
          fetchComments,
     }
}
