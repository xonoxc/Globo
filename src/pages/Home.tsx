import React, { useEffect, useState, Suspense } from "react"
import { postService } from "../services/conf"
import { PostProps } from "../types"
import { Container, PostCard } from "../components"
import { AppDispatch, RootState } from "../store/store"
import { Text } from "lucide-react"
import { Button } from "../components"
import { MetroSpinner } from "react-spinners-kit"
import { useDispatch, useSelector } from "react-redux"
import { Newspaper } from "lucide-react"
import { saveCache } from "../store/postSlice"
import Spinner from "../components/spinner/Spinner"

const Search = React.lazy(() => import("../components/Search"))

export default function Home(): JSX.Element {
	const dispatch = useDispatch<AppDispatch>()
	const [posts, setPosts] = useState<PostProps[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const { postData, status } = useSelector((state: RootState) => state.posts)

	const authStatus = useSelector((state: RootState) => state.auth.status)

	const fetchPosts = async (): Promise<void> => {
		try {
			setLoading(true)
			const response = await postService.getFeed()

			if (response) {
				setPosts(response as PostProps[])
				dispatch(saveCache(response))
			}
		} catch (error) {
			console.error("Error while fetching Posts", error)
		} finally {
			setLoading(false)
		}
	}


	useEffect(() => {
		; (async () => {
			if (status) {
				setPosts(postData as unknown as PostProps[])
			} else {
				await fetchPosts()
			}
		})()
	}, [])

	const postRefresh = async () => {
		setPosts([])
		await fetchPosts()
	}

	if (!authStatus) {
		return (
			<div className="w-full py-8 mt-4 text-center h-1/2">
				<Container>
					<div className="flex flex-wrap">
						<div className="p-2 w-full">
							<h1 className="text-2xl font-bold hover:text-gray-500 flex items-center justify-center flex-col gap-2">
								<Newspaper
									size={200}
									className="text-gray-300"
								/>
								<p className="font-bold uppercase">
									Login to see feed!
								</p>
							</h1>
						</div>
					</div>
				</Container>
			</div>
		)
	}

	if (posts.length === 0) {
		return (
			<div className="w-full py-8 mt-4 text-center">
				<Container>
					<div className="flex flex-wrap items-center justify-center">
						<div className="alt-container flex items-center w-1/4 justify-center flex-col">
							<Text size={200} className="text-gray-300" />
							<h2 className="text-center uppercase font-bold text-2xl">
								No New articles found
							</h2>
							<p>refresh the feed to get started!</p>
							<Button
								onClick={() => postRefresh()}
								className="text-white flex items-center justify-center mt-2"
							>
								{loading ? (
									<MetroSpinner />
								) : (
									<span>Reload</span>
								)}
							</Button>
						</div>
					</div>
				</Container>
			</div>
		)
	}

	return (
		<div className="w-full py-8 ">
			<Container>
				<div className=" flex items-center justify-center w-full ">
					<div className="relative bg-white rounded-md border-b-gray border-2 border-t-0 border-r-0 border-l-0 p-4 w-full">
						<Suspense
							fallback={<Spinner className="text-black" />}
						>
							<Search />
						</Suspense>
					</div>
				</div>
				<div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4">
					{posts.map(post => (
						<div
							key={post.id}
							className="p-2 w-full  sm:w-1/4 "
						>
							<PostCard
								authorId={post.user?.id as string}
								title={post.title}
								id={post.id as number}
								imageUrl={post.image as string}
								authorName={post.user?.name as string}
								authorAvatar={
									post.user?.avatar as string
								}
								displayAvatar
								createdAt={post.createdAt as string}
							/>
						</div>
					))}
				</div>
			</Container>
		</div>
	)
}
