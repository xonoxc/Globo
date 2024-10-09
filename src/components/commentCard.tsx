import React from "react"
import { Link } from "react-router-dom"
import {
	Trash2,
	ThumbsUp,
	MessageCircle,
	ChevronDown,
	ChevronUp,
} from "lucide-react"
import getRelativeTime from "../utils/date"

interface CommentCardProps {
	comment: any
	toggleCommentLike: (commentId: string, articleId: string) => void
	deleteComment: (commentId: string) => void
	setReplyingTo: (commentId: string | null) => void
	handleReply: (commentId: string) => void
	newReply: string
	setNewReply: (reply: string) => void
	expandedReplies: { [key: string]: any[] }
	toggleReplies: (commentId: string) => void
	isReplyingTo: string | null
	setIsReplyingTo: (replyingTo: string | null) => void
}

const CommentCard: React.FC<CommentCardProps> = ({
	comment,
	toggleCommentLike,
	deleteComment,
	setReplyingTo,
	handleReply,
	newReply,
	setNewReply,
	setIsReplyingTo,
	isReplyingTo,
	expandedReplies,
	toggleReplies,
}) => {
	console.log("comments", comment)

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
								onClick={() =>
									deleteComment(comment.id)
								}
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
							onClick={() => toggleCommentLike(comment.id, comment.articleId)}
							aria-label={`Like comment by ${comment.user.name}`}
							className="text-blue-500 hover:text-blue-600 flex items-center"
						>
							<ThumbsUp className="h-4 w-4 mr-1" />
							<span>{comment._count.likes}</span>
						</button>
						<button
							onClick={() => setIsReplyingTo(comment.id)}
							aria-label={`Reply to comment by ${comment.user.name}`}
							className="text-gray-500 hover:text-gray-600 flex items-center"
						>
							<MessageCircle className="h-4 w-4 mr-1" />
							<span>Reply</span>
						</button>
						{Number(comment._count.replies) > 0 && (
							<button
								onClick={() =>
									toggleReplies(comment.id)
								}
								aria-label={`${expandedReplies[comment.id] ? "Hide" : "Show"} replies`}
								className="text-gray-500 hover:text-gray-600 flex items-center"
							>
								{expandedReplies[comment.id] ? (
									<ChevronUp className="h-4 w-4 mr-1" />
								) : (
									<ChevronDown className="h-4 w-4 mr-1" />
								)}
								<span>
									{comment._count.replies} Replies
								</span>
							</button>
						)}
					</div>
					{/* Reply Form */}
					{isReplyingTo === comment.id && (
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
									onClick={() => setReplyingTo(null)}
									className="px-4 py-2 border rounded-md"
								>
									Cancel
								</button>
								<button
									onClick={() =>
										handleReply(comment.id)
									}
									className="px-4 py-2 bg-black text-white rounded-md"
								>
									Reply
								</button>
							</div>
						</div>
					)}
					{/* Display Replies */}
					{expandedReplies[comment.id] && (
						<ul className="mt-4 space-y-4">
							{expandedReplies[comment.id].map(reply => (
								<CommentCard
									key={reply.id}
									comment={reply}
									toggleCommentLike={
										toggleCommentLike
									}
									deleteComment={deleteComment}
									setReplyingTo={setReplyingTo}
									handleReply={handleReply}
									newReply={newReply}
									setNewReply={setNewReply}
									expandedReplies={expandedReplies}
									toggleReplies={toggleReplies}
									isReplyingTo={isReplyingTo}
									setIsReplyingTo={setIsReplyingTo}
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
