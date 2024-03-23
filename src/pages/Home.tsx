import { useEffect, useState } from "react"
import appwriteSerive from "../appwrite/conf"
import { PostProps } from "../types"
import { Container, PostCard } from "../components"

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    appwriteSerive.getAllPosts([]).then((response) => {
      if (response && response.documents) {
        const parsedPosts = response.documents as unknown as Post[]
        setPosts(parsedPosts)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
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
