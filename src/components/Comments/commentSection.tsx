import { useState } from "react"
import Button from "../Button"
import getRelativeTime from "../../utils/date"

import {
     Trash2,
     ThumbsUp,
     MessageCircle,
     ChevronDown,
     ChevronUp,
} from "lucide-react"

type Reply = {
     id: number
     author: string
     content: string
     date: string
}

type Comment = {
     id: number
     author: string
     content: string
     date: string
     likes: number
     replies: Reply[]
}

export default function CommentSection() {
     const [comments, setComments] = useState<Comment[]>([
          {
               id: 1,
               author: "John Doe",
               content: "Great article! Thanks for sharing.",
               date: "2023-05-15",
               likes: 3,
               replies: [
                    {
                         id: 1,
                         author: "Alice",
                         content: "Totally agree!",
                         date: "2023-05-16",
                    },
                    {
                         id: 2,
                         author: "Bob",
                         content: "I found it insightful too.",
                         date: "2023-05-17",
                    },
               ],
          },
          {
               id: 2,
               author: "Jane Smith",
               content: "I learned a lot from this. Looking forward to more content!",
               date: "2023-05-16",
               likes: 1,
               replies: [],
          },
     ])
     const [newComment, setNewComment] = useState("")
     const [replyingTo, setReplyingTo] = useState<number | null>(null)
     const [newReply, setNewReply] = useState("")
     const [expandedReplies, setExpandedReplies] = useState<number[]>([])

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault()
          if (newComment.trim()) {
               const comment: Comment = {
                    id: comments.length + 1,
                    author: "Current User",
                    content: newComment.trim(),
                    date: new Date().toISOString().split("T")[0],
                    likes: 0,
                    replies: [],
               }
               setComments([...comments, comment])
               setNewComment("")
          }
     }

     const handleDelete = (id: number) => {
          setComments(comments.filter(comment => comment.id !== id))
     }

     const handleLike = (id: number) => {
          setComments(
               comments.map(comment =>
                    comment.id === id
                         ? { ...comment, likes: comment.likes + 1 }
                         : comment
               )
          )
     }

     const handleReply = (commentId: number) => {
          if (newReply.trim()) {
               setComments(
                    comments.map(comment =>
                         comment.id === commentId
                              ? {
                                     ...comment,
                                     replies: [
                                          ...comment.replies,
                                          {
                                               id: comment.replies.length + 1,
                                               author: "Current User",
                                               content: newReply.trim(),
                                               date: new Date()
                                                    .toISOString()
                                                    .split("T")[0],
                                          },
                                     ],
                                }
                              : comment
                    )
               )
               setNewReply("")
               setReplyingTo(null)
          }
     }

     const toggleReplies = (commentId: number) => {
          setExpandedReplies(prev =>
               prev.includes(commentId)
                    ? prev.filter(id => id !== commentId)
                    : [...prev, commentId]
          )
     }

     return (
          <section className="w-full mx-auto mt-12 p-6 bg-white rounded-lg shadow">
               <h2 className="text-2xl font-bold mb-6">Comments</h2>

               <ul className="space-y-6 mb-8">
                    {comments.map(comment => (
                         <li key={comment.id} className="border-b pb-4">
                              <div className="flex items-start space-x-4">
                                   <img
                                        src={`https://i.pravatar.cc/40?u=${comment.author}`}
                                        alt={comment.author}
                                        className="h-10 w-10 rounded-full"
                                   />
                                   <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                             <h3 className="font-semibold">
                                                  {comment.author}
                                             </h3>
                                             <div className="flex items-center space-x-2">
                                                  <time
                                                       className="text-sm text-gray-500"
                                                       dateTime={comment.date}
                                                  >
                                                       {getRelativeTime(
                                                            comment.date
                                                       )}
                                                  </time>
                                                  <button
                                                       onClick={() =>
                                                            handleDelete(
                                                                 comment.id
                                                            )
                                                       }
                                                       aria-label={`Delete comment by ${comment.author}`}
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
                                                       handleLike(comment.id)
                                                  }
                                                  aria-label={`Like comment by ${comment.author}`}
                                                  className="text-blue-500 hover:text-blue-600 flex items-center"
                                             >
                                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                                  <span>{comment.likes}</span>
                                             </button>
                                             <button
                                                  onClick={() =>
                                                       setReplyingTo(
                                                            replyingTo ===
                                                                 comment.id
                                                                 ? null
                                                                 : comment.id
                                                       )
                                                  }
                                                  aria-label={`Reply to comment by ${comment.author}`}
                                                  className="text-gray-500 hover:text-gray-600 flex items-center"
                                             >
                                                  <MessageCircle className="h-4 w-4 mr-1" />
                                                  <span>Reply</span>
                                             </button>
                                             {comment.replies.length > 0 && (
                                                  <button
                                                       onClick={() =>
                                                            toggleReplies(
                                                                 comment.id
                                                            )
                                                       }
                                                       aria-label={`${expandedReplies.includes(comment.id) ? "Hide" : "Show"} replies`}
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
                                                                 comment.replies
                                                                      .length
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
                                                                 e.target.value
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
                                                                 key={reply.id}
                                                                 className="flex items-start space-x-4"
                                                            >
                                                                 <img
                                                                      src={`https://i.pravatar.cc/40?u=${reply.author}`}
                                                                      alt={
                                                                           reply.author
                                                                      }
                                                                      className="h-8 w-8 rounded-full"
                                                                 />
                                                                 <div className="flex-1">
                                                                      <div className="flex items-center justify-between">
                                                                           <h4 className="font-semibold">
                                                                                {
                                                                                     reply.author
                                                                                }
                                                                           </h4>
                                                                           <time
                                                                                className="text-sm text-gray-500"
                                                                                dateTime={
                                                                                     reply.date
                                                                                }
                                                                           >
                                                                                {getRelativeTime(
                                                                                     reply.date
                                                                                )}
                                                                           </time>
                                                                      </div>
                                                                      <p className="mt-1 text-gray-700">
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

               <form onSubmit={handleSubmit} className="space-y-4">
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
                              onChange={e => setNewComment(e.target.value)}
                              placeholder="Add a comment"
                              rows={4}
                              className="w-full border p-2 rounded-md"
                              required
                         />
                    </div>
                    <Button
                         type="submit"
                         className="w-full md:w-1/5  text-white"
                    >
                         Comment
                    </Button>
               </form>
          </section>
     )
}
