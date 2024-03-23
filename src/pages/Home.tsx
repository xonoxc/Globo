import { useEffect, useState } from "react"
import appwriteSerive from "../appwrite/conf"
import { PostProps } from "../types"
import { Container, PostCard } from "../components"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<PostProps[]>([])

  const authStatus = useSelector((state: RootState) => state.auth.status)

  useEffect(() => {
    appwriteSerive.getAllPosts([]).then((response) => {
      if (response && response.documents) {
        const parsedPosts = response.documents as unknown as PostProps[]
        setPosts(parsedPosts)
      }
    })
  }, [])

  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to see feed!
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
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Posts yet
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} image={post.image as string}></PostCard>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
