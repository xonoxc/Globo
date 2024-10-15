import { JSX, lazy, Suspense, useEffect, useState } from "react"
import { IUserProfile } from "@/types/apiResponse.ts"
import { useParams } from "react-router-dom"
import { useProfile } from "../hooks/useProfile.tsx"
import { useNavigate } from "react-router-dom"
import Fallback from "../pages/Fallback.tsx"
import Button from "../components/Button.tsx"
import { Loader2, MoveLeft } from "lucide-react"
import { bookmarks as bookmarksService } from "../services/bookmarks.ts"

const ProfileComponent = lazy(() => import("../components/Profile/profile.tsx"))

export default function ProfilePage(): JSX.Element {
	const { userId } = useParams<{ userId: string }>()
	const { profile, isAuthor, loading, setLoading } = useProfile(userId as string)
	const [bookmarks, setBookmarks] = useState<
		{ articleId: string; post: { title: string }; createdAt: string }[]
	>([])
	const navigate = useNavigate()

	useEffect(() => {
		; (async () => {
			setLoading(true)
			if (userId) {
				const response =
					await bookmarksService.getUserBookmarks(userId as string)
				if (response) setBookmarks(response)
			}
			setLoading(false)
		})()
	}, [profile, userId])

	if (!loading && (!userId || !profile || userId === "undefined"))
		return <Fallback />

	return (
		<div className="py-8">
			<Suspense fallback={profileFallbackLoader()}>
				<div className="back w-1/4">
					<Button
						className="md:w-1/3 w-1/2 flex  items-center justify-center bg-transparent font-bold gap-2"
						onClick={() => navigate("/")}
					>
						<MoveLeft size={15} fontWeight={800} />
						Back
					</Button>
				</div>
				<ProfileComponent
					data={profile as IUserProfile}
					isAuthor={isAuthor}
					loading={loading}
					bookmarks={bookmarks}
				/>
			</Suspense>
		</div>
	)
}



const profileFallbackLoader = () => {
	return (
		<div className="py-24 flex items-center justify-center">
			<Loader2 className="mr-2 h-10 w-10 animate-spin" />
		</div>
	)
}
