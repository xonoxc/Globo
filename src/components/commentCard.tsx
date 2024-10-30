import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
     Trash2,
     ThumbsUp,
     MessageCircle,
     ChevronDown,
     ChevronUp,
} from "lucide-react"
import getRelativeTime from "../utils/date"
import { Comment, useComments } from "../hooks/useComments"

interface CommentCardProps {
     comment: Comment
     onDelete?: (commentId: string) => void
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onDelete }) => {
     const [replies, setReplies] = useState<Comment[]>(comment.replies || [])
     const [newReply, setNewReply] = useState<string>("")
     const [likeCount, setLikeCount] = useState<number>(0)
     const [replyCount, setReplyCount] = useState<number>(0)
     const [repliesVisible, setRepliesVisible] = useState<boolean>(false)
     const [isLiked, setIsLiked] = useState<boolean>(false)
     const [formVisible, setFormVisible] = useState<boolean>(false)
     const { addComment, toggleCommentLike, getLikedStatus, deleteComment } =
          useComments()

     const handleCommentReply = async () => {
          try {
               const response = await addComment(
                    newReply,
                    comment.articleId,
                    comment.id
               )

               if (response) {
                    setReplies(prev => [response, ...prev])
                    setReplyCount(prev => prev + 1)
               }
          } catch (error) {
               console.error("Error while adding comment:", error)
          } finally {
               setNewReply("")
               setFormVisible(false)
          }
     }

     const handleCommentLikeClick = async () => {
          try {
               await toggleCommentLike(comment.id, comment.articleId)
               if (isLiked && likeCount > 0) {
                    setLikeCount(prev => prev - 1)
                    setIsLiked(false)
               } else {
                    setLikeCount(prev => prev + 1)
                    setIsLiked(true)
               }
          } catch (error) {
               console.log("error toggling comment like", error)
          }
     }

     useEffect(() => {
          ;(async () => {
               const { status } = await getLikedStatus(comment.id)
               setIsLiked(status)

               if (comment._count) {
                    setLikeCount(Number(comment._count.likes))
                    setReplyCount(Number(comment._count.replies))
               }
          })()
     }, [comment])

     const handleDeleteButtonClick = async () => {
          try {
               await deleteComment(comment.id, comment.parentId)

               if (comment.parentId && onDelete) {
                    onDelete(comment.id)
               }
               setReplies(prev => prev.filter(reply => reply.id !== comment.id))
          } catch (error) {
               console.error("Error while deleting comment:", error)
          }
     }

     const handleReplyDelete = async (replyId: string) => {
          setReplies(prev => prev.filter(reply => reply.id !== replyId))
          setReplyCount(prev => prev - 1)
     }

     return (
          <li key={comment.id} className="border-t pt-4">
               <div className="flex items-start space-x-4">
                    <Link to={`/u/profile/${comment.userId}`}>
                         <img
                              src={comment.user.avatar}
                              alt={comment.user.name}
                              className="h-10 w-10 rounded-full"
                         />
                    </Link>
                    <div className="flex-1">
                         <div className="flex items-center justify-between">
                              <h3 className="font-semibold">
                                   {comment.user.name}
                              </h3>
                              <div className="flex items-center space-x-2">
                                   <time
                                        className="text-sm text-gray-500"
                                        dateTime={getRelativeTime(
                                             comment.createdAt
                                        )}
                                   >
                                        {getRelativeTime(comment.createdAt)}
                                   </time>
                                   <button
                                        onClick={handleDeleteButtonClick}
                                        aria-label={`Delete comment by ${comment.user.name}`}
                                        className="text-red-500 hover:text-red-600"
                                   >
                                        <Trash2 className="h-4 w-4" />
                                   </button>
                              </div>
                         </div>
                         <p className="mt-2 text-gray-700">{comment.content}</p>
                         <div className="mt-2 flex items-center space-x-4">
                              <button
                                   onClick={handleCommentLikeClick}
                                   aria-label={`Like comment by ${comment.user.name}`}
                                   className={` ${isLiked ? "text-red-500" : "text-gray-500"} hover:text-blue-600 flex items-center`}
                              >
                                   <ThumbsUp className="h-4 w-4 mr-1" />
                                   <span>{likeCount}</span>
                              </button>
                              <button
                                   onClick={() => setFormVisible(prev => !prev)}
                                   aria-label={`Reply to comment by ${comment.user.name}`}
                                   className="text-gray-500 hover:text-gray-600 flex items-center"
                              >
                                   <MessageCircle className="h-4 w-4 mr-1" />
                                   <span>Reply</span>
                              </button>
                              {replyCount > 0 && (
                                   <button
                                        onClick={() =>
                                             setRepliesVisible(prev => !prev)
                                        }
                                        aria-label={`${repliesVisible ? "Hide" : "Show"} replies`}
                                        className="text-gray-500 hover:text-gray-600 flex items-center"
                                   >
                                        {repliesVisible ? (
                                             <ChevronUp className="h-4 w-4 mr-1" />
                                        ) : (
                                             <ChevronDown className="h-4 w-4 mr-1" />
                                        )}
                                        <span>{replyCount} Replies</span>
                                   </button>
                              )}
                         </div>
                         {/* Reply Form */}
                         {formVisible && (
                              <div className="mt-4">
                                   <textarea
                                        value={newReply}
                                        onChange={e =>
                                             setNewReply(e.target.value)
                                        }
                                        placeholder="Write your reply..."
                                        rows={2}
                                        className="w-full border p-2 rounded-md"
                                   />
                                   <div className="mt-2 flex justify-end space-x-2">
                                        <button
                                             onClick={() => {
                                                  setNewReply("")
                                                  setFormVisible(false)
                                             }}
                                             className="px-4 py-2 border rounded-md"
                                        >
                                             Cancel
                                        </button>
                                        <button
                                             onClick={handleCommentReply}
                                             className="px-4 py-2 bg-black text-white rounded-md"
                                        >
                                             Reply
                                        </button>
                                   </div>
                              </div>
                         )}
                         {/* Display Replies */}
                         {repliesVisible && (
                              <ul className="mt-4 space-y-4">
                                   {replies.map(reply => (
                                        <CommentCard
                                             key={reply.id}
                                             comment={reply}
                                             onDelete={handleReplyDelete}
                                        />
                                   ))}
                              </ul>
                         )}
                    </div>
               </div>
          </li>
     )
}

export default CommentCard
