import { useState, useEffect } from "react"
import { PostCard, Container } from "../components"
import { postService } from "../services/conf"
import { PostProps } from "../types"
import { Text } from "lucide-react"

export default function AllPosts(): JSX.Element {
     const [posts, setPosts] = useState<PostProps[] | undefined>([])

     useEffect(() => {
          postService.getUserPosts().then((response) => {
               setPosts(response)
          })
     }, [])

     return (
          <div className="allposts w-full py-8">
               <Container>
                    <div className="flex flex-col w-full sm:w-auto sm:flex-row  sm:flex-wrap">
                         {posts?.length !== 0 ? (
                              posts?.map((post: PostProps) => (
                                   <div
                                        key={post.id}
                                        className="p-2 sm:w-1/4 w-full"
                                   >
                                        <PostCard
                                             id={post.id as number}
                                             displayAvatar={false}
                                             imageUrl={post.image as string}
                                             title={post.title}
                                             createdAt={post.createdAt}
                                        />
                                   </div>
                              ))
                         ) : (
                              <div className="alt-container flex items-center w-full justify-center flex-col">
                                   <Text size={200} className="text-gray-300" />
                                   <h2 className="text-center uppercase font-bold text-2xl">
                                        No Posts Created
                                   </h2>
                                   <p>Create a post to get started!</p>
                              </div>
                         )}
                    </div>
               </Container>
          </div>
     )
}
