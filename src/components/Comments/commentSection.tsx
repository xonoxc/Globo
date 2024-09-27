import { useState, useCallback, useEffect } from "react"
import { Link } from "react-router-dom"
import Button from "../Button"
import getRelativeTime from "../../utils/date"
import {
     Trash2,
     ThumbsUp,
     MessageCircle,
     ChevronDown,
     ChevronUp,
} from "lucide-react"
import { useComments } from "../../hooks/useComments"
import { useDebounce } from "use-debounce"
import { useStats } from "../..//hooks/useStats"

interface CommentSectionProps {
     isFormVisible: boolean
     postId: string
}

const CommentSection: React.FC<CommentSectionProps> = ({
     isFormVisible,
     postId,
}) => {
     const [newComment, setNewComment] = useState("")
     const [replyingTo, setReplyingTo] = useState<string | null>(null)
     const [loading, setLoading] = useState(true)
     const [newReply, setNewReply] = useState("")
     const [expandedReplies, setExpandedReplies] = useState<string[]>([])
     const { incLocalCommentCount } = useStats(postId)
     const {
          addComment,
          deleteComment,
          toggleCommentLike,
          comments,
          fetchComments,
     } = useComments()

     const [debouncedNewComment] = useDebounce(newComment, 300)

     const handleReply = async (commentId: string) => {
          try {
               setLoading(true)
               await addComment(newReply, postId, commentId)
               setReplyingTo(null)
               setNewReply("")
          } catch (error) {
               console.error("Error adding comment reply:", error)
          } finally {
               setLoading(false)
          }
     }

     const toggleReplies = (commentId: string) => {
          if (expandedReplies.includes(commentId)) {
               setExpandedReplies(
                    expandedReplies.filter(id => id !== commentId)
               )
          } else {
               setExpandedReplies([...expandedReplies, commentId])
          }
     }

     const handleNewCommentSubmission = useCallback(
          async (e: React.FormEvent) => {
               try {
                    setLoading(true)
                    e.preventDefault()
                    if (debouncedNewComment.trim()) {
                         await addComment(debouncedNewComment, postId)
                         incLocalCommentCount()
                         setNewComment("")
                    }
               } catch (error) {
                    console.error("Error adding comment", error)
               } finally {
                    setLoading(false)
               }
          },
          [postId, debouncedNewComment, fetchComments, addComment]
     )

     useEffect(() => {
          ;(async () => {
               setLoading(true)
               await fetchComments(postId)
               setLoading(false)
          })()
     }, [postId])

     return (
          <section className="w-full mx-auto mt-12 p-6 bg-white rounded-lg shadow">
               <h2 className="text-2xl font-bold mb-6">Comments</h2>

               {isFormVisible && (
                    <div className="form mb-3 border-b py-4">
                         <form
                              onSubmit={async e =>
                                   handleNewCommentSubmission(e)
                              }
                              className="space-y-4"
                         >
                              <div>
                                   <label
                                        htmlFor="comment"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                   >
                                        Add a comment
                                   </label>
                                   <textarea
                                        id="comment"
                                        value={newComment}
                                        onChange={e =>
                                             setNewComment(e.target.value)
                                        }
                                        placeholder="Add a comment"
                                        rows={4}
                                        className="w-full border p-2 rounded-md"
                                        required
                                   />
                              </div>
                              <Button
                                   type="submit"
                                   className="w-full md:w-1/5 text-white"
                              >
                                   Comment
                              </Button>
                         </form>
                    </div>
               )}

               {loading ? (
                    <div className="animate-pulse">
                         <div className="space-y-4">
                              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                              <div className="h-4 bg-gray-200 rounded w-full"></div>
                              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                         </div>
                    </div>
               ) : !comments || comments.length === 0 ? (
                    <div className="message">
                         <div className="message-body text-2xl text-gray-500">
                              No comments yet.....
                         </div>
                    </div>
               ) : (
                    <ul className="space-y-6 ">
                         {comments.map(comment => (
                              <li key={comment.id} className="border-t pt-4">
                                   <div className="flex items-start space-x-4">
                                        <Link
                                             to={`/u/profile/${comment.user.id}`}
                                        >
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
                                                            {getRelativeTime(
                                                                 comment.createdAt
                                                            )}
                                                       </time>
                                                       <button
                                                            onClick={() =>
                                                                 deleteComment(
                                                                      comment.id
                                                                 )
                                                            }
                                                            aria-label={`Delete comment by ${comment.user.name}`}
                                                            className="text-red-500 hover:text-red-600"
                                                       >
                                                            <Trash2 className="h-4 w-4" />
                                                       </button>
                                                  </div>
                                             </div>
                                             <p className="mt-2 text-gray-700">
                                                  {comment.content}
                                             </p>
                                             <div className="mt-2 flex items-center space-x-4">
                                                  <button
                                                       onClick={() =>
                                                            toggleCommentLike(
                                                                 comment.id
                                                            )
                                                       }
                                                       aria-label={`Like comment by ${comment.user.name}`}
                                                       className="text-blue-500 hover:text-blue-600 flex items-center"
                                                  >
                                                       <ThumbsUp className="h-4 w-4 mr-1" />
                                                       <span>
                                                            {
                                                                 comment._count
                                                                      .likes
                                                            }
                                                       </span>
                                                  </button>
                                                  <button
                                                       onClick={() =>
                                                            setReplyingTo(
                                                                 comment.id
                                                            )
                                                       }
                                                       aria-label={`Reply to comment by ${comment.user.name}`}
                                                       className="text-gray-500 hover:text-gray-600 flex items-center"
                                                  >
                                                       <MessageCircle className="h-4 w-4 mr-1" />
                                                       <span>Reply</span>
                                                  </button>
                                                  {comment._count.replies >
                                                       0 && (
                                                       <button
                                                            onClick={() =>
                                                                 toggleReplies(
                                                                      comment.id
                                                                 )
                                                            }
                                                            aria-label={`${
                                                                 expandedReplies.includes(
                                                                      comment.id
                                                                 )
                                                                      ? "Hide"
                                                                      : "Show"
                                                            } replies`}
                                                            className="text-gray-500 hover:text-gray-600 flex items-center"
                                                       >
                                                            {expandedReplies.includes(
                                                                 comment.id
                                                            ) ? (
                                                                 <ChevronUp className="h-4 w-4 mr-1" />
                                                            ) : (
                                                                 <ChevronDown className="h-4 w-4 mr-1" />
                                                            )}
                                                            <span>
                                                                 {
                                                                      comment
                                                                           ._count
                                                                           .replies
                                                                 }{" "}
                                                                 Replies
                                                            </span>
                                                       </button>
                                                  )}
                                             </div>
                                             {replyingTo === comment.id && (
                                                  <div className="mt-4">
                                                       <textarea
                                                            value={newReply}
                                                            onChange={e =>
                                                                 setNewReply(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                            placeholder="Write your reply..."
                                                            rows={2}
                                                            className="w-full border p-2 rounded-md"
                                                       />
                                                       <div className="mt-2 flex justify-end space-x-2">
                                                            <button
                                                                 onClick={() =>
                                                                      setReplyingTo(
                                                                           null
                                                                      )
                                                                 }
                                                                 className="px-4 py-2 border rounded-md"
                                                            >
                                                                 Cancel
                                                            </button>
                                                            <button
                                                                 onClick={() =>
                                                                      handleReply(
                                                                           comment.id
                                                                      )
                                                                 }
                                                                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                                            >
                                                                 Post Reply
                                                            </button>
                                                       </div>
                                                  </div>
                                             )}
                                             {expandedReplies.includes(
                                                  comment.id
                                             ) && (
                                                  <ul className="mt-4 space-y-4">
                                                       {comment.replies.map(
                                                            reply => (
                                                                 <li
                                                                      key={
                                                                           reply.id
                                                                      }
                                                                      className="flex items-start space-x-4"
                                                                 >
                                                                      <img
                                                                           src={`https://i.pravatar.cc/40?img=${reply.user.id}`}
                                                                           alt={
                                                                                reply
                                                                                     .user
                                                                                     .name
                                                                           }
                                                                           className="h-8 w-8 rounded-full"
                                                                      />
                                                                      <div className="flex-1">
                                                                           <h4 className="font-semibold">
                                                                                {
                                                                                     reply
                                                                                          .user
                                                                                          .name
                                                                                }
                                                                           </h4>
                                                                           <p className="text-gray-700">
                                                                                {
                                                                                     reply.content
                                                                                }
                                                                           </p>
                                                                      </div>
                                                                 </li>
                                                            )
                                                       )}
                                                  </ul>
                                             )}
                                        </div>
                                   </div>
                              </li>
                         ))}
                    </ul>
               )}
          </section>
     )
}

export default CommentSection
