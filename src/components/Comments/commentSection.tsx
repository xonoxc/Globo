import { useState, useCallback, useEffect } from "react"
import Button from "../Button"
import { useComments } from "../../hooks/useComments"
import { useDebounce } from "use-debounce"
import { useStats } from "../../hooks/useStats"
import { Comment } from "../../hooks/useComments"
import CommentCard from "../commentCard"

interface CommentSectionProps {
	isFormVisible: boolean
	postId: string
}

interface Replies {
	[key: string]: Comment[]
}

const CommentSection: React.FC<CommentSectionProps> = ({
	isFormVisible,
	postId,
}) => {
	const [newComment, setNewComment] = useState("")
	const [replyingTo, setReplyingTo] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)
	const [newReply, setNewReply] = useState("")
	const [expandedReplies, setExpandedReplies] = useState<Replies>({})
	const { incLocalCommentCount } = useStats(postId)
	const {
		addComment,
		deleteComment,
		toggleCommentLike,
		fetchReplies,
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

	const toggleReplies = async (commentId: string) => {
		if (expandedReplies[commentId]) {
			const updatedReplies = { ...expandedReplies }
			delete updatedReplies[commentId]
			setExpandedReplies(updatedReplies)
		} else {
			setLoading(true)

			const replies = await fetchReplies(commentId)

			setExpandedReplies({
				...expandedReplies,
				[commentId]: replies,
			})

			setLoading(false)
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
		(async () => {
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
			) : !loading && comments?.length === 0 ? (
				<div className="message">
					<div className="message-body text-2xl text-gray-500">
						No comments yet.....
					</div>
				</div>
			) : (
				<ul className="space-y-6">
					{comments?.length > 0 && (
						<ul className="mt-4 space-y-4">
							{comments?.map((comment, index) => (
								<CommentCard
									key={index}
									comment={comment}
									toggleCommentLike={toggleCommentLike}
									deleteComment={deleteComment}
									setReplyingTo={setReplyingTo}
									handleReply={handleReply}
									newReply={newReply}
									setNewReply={setNewReply}
									expandedReplies={expandedReplies}
									toggleReplies={toggleReplies}
									isReplyingTo={replyingTo}
									setIsReplyingTo={setReplyingTo}
								/>
							))}
						</ul>
					)}
				</ul>
			)}
		</section>
	)
}

export default CommentSection
