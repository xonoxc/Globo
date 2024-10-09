import { Bookmark, BookmarkCheck, Heart, MessageCircle } from "lucide-react"
import AuthorStrip from "../components/AuthorStrip"
import getRelativeCount from "../utils/count"
import { useStats } from "../hooks/useStats"

interface ActionStripProps {
	displayAvatar: boolean
	avatar?: string
	name?: string
	createdAt?: string
	authorId: string
	commentCount?: number
	postId: string
	onToggleCommentSection: () => void
}

const ActionStrip: React.FC<ActionStripProps> = ({
	displayAvatar,
	name,
	avatar,
	createdAt,
	authorId,
	postId,
	onToggleCommentSection,
}) => {
	const {
		stats,
		isBookmarked,
		isLoading,
		toggleLike,
		toggleBookmark,
		isLiked,
	} = useStats(postId)

	console.log("name", name)

	if (isLoading) {
		return (
			<div className="w-full flex bg-gray-200 animate-pulse rounded-xl items-center md:justify-between px-4 md:flex-row flex-col">
				<div className="actions flex items-center justify-around gap-2">
					<div className="w-10 h-4 bg-gray-300 rounded"></div>
					<div className="w-10 h-4 bg-gray-300 rounded"></div>
					<div className="w-10 h-4 bg-gray-300 rounded"></div>
				</div>
				<div className="author justify-around">
					<div className="w-20 h-4 bg-gray-300 rounded"></div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full flex bg-gray-50 rounded-xl items-center md:justify-between px-4 md:flex-row flex-col">
			<div className="actions flex items-center justify-around gap-2 py-5">
				<button onClick={async () => await toggleLike(postId)}>
					<span className="text-gray-500 font-bold flex gap-2 items-center">
						<Heart color={isLiked ? "red" : "gray"} />
						<span
							className={
								isLiked
									? "text-red-500"
									: "text-gray-500"
							}
						>
							{typeof stats.likeCount === "number"
								? getRelativeCount(stats.likeCount)
								: 0}
						</span>
					</span>
				</button>

				<button>
					<span
						className="text-gray-500 font-bold flex gap-2 items-center justify-center"
						onClick={onToggleCommentSection}
					>
						<span className="flex gap-2 items-center">
							<MessageCircle />
							<span>
								{typeof stats.commentCount === "number"
									? getRelativeCount(
										stats.commentCount
									)
									: 0}
							</span>
						</span>
					</span>
				</button>

				<button onClick={async () => await toggleBookmark(postId)}>
					<span className="text-gray-500 font-bold flex gap-2 items-center justify-center">
						{isBookmarked ? <BookmarkCheck /> : <Bookmark />}
					</span>
				</button>
			</div>
			<div className="author justify-around">
				<AuthorStrip
					isLoading={isLoading}
					displayAvatar={displayAvatar}
					authorId={authorId}
					avatar={avatar || ""}
					name={name || ""}
					createdAt={createdAt}
				/>
			</div>
		</div>
	)
}

export default ActionStrip
