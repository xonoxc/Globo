import { useState, useEffect } from "react"
import { PostCard, Container } from "../components"
import appwriteService from "../appwrite/conf"
import { PostProps } from "../types"

export default function AllPosts(): JSX.Element {
  const [posts, setPosts] = useState<PostProps[] | undefined>([])

  useEffect(() => {
    appwriteService.getAllPosts([]).then((response) => {
      const transformedPost = response?.documents as unknown as PostProps[]
      setPosts(transformedPost)
    })
  }, [])

  return (
    <div className="allposts w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts &&
            posts.map((post: PostProps) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard
                  $id={post.$id}
                  image={post.image as string}
                  title={post.title}
                />
              </div>
            ))}
        </div>
      </Container>
    </div>
  )
}
