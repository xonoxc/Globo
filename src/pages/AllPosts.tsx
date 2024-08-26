import { useState, useEffect } from "react"
import { PostCard, Container } from "../components"
import { postService } from "../services/conf"
import { PostProps } from "../types"
import { Text } from "lucide-react"

export default function AllPosts(): JSX.Element {
     const [posts, setPosts] = useState<PostProps[] | undefined>([])

     useEffect(() => {
          postService.getUserPosts().then(response => {
               setPosts(response)
          })
     }, [])

     return (
          <div className="allposts w-full py-8">
               <Container>
                    <div className="directive font-bold uppercase border-b-black border-2 border-t-0 border-r-0 border-l-0">
                         Your Posts:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                             createdAt={
                                                  post.createdAt as string
                                             }
                                        />
                                   </div>
                              ))
                         ) : (
                              <div className="alt-container flex items-center w-full justify-center flex-col">
                                   <div className="widget">
                                        <Text
                                             size={200}
                                             className="text-gray-300"
                                        />
                                        <h2 className="text-center uppercase font-bold text-2xl">
                                             No Posts Created
                                        </h2>
                                        <p>Create a post to get started!</p>
                                   </div>
                              </div>
                         )}
                    </div>
               </Container>
          </div>
     )
}
