import { useState, useEffect } from "react"
import { PostCard, Container } from "../components"
import appwriteService from "../appwrite/conf"
import { PostProps } from "../types"
import { Text } from "lucide-react"
import { useParams } from "react-router-dom"

export default function AllPosts(): JSX.Element {
     const [posts, setPosts] = useState<PostProps[] | undefined>([])

     useEffect(() => {
          appwriteService.getAllPosts([]).then((response) => {
               const transformedPost =
                    response?.documents as unknown as PostProps[]
               setPosts(transformedPost)
          })
     }, [])

     return (
          <div className="allposts w-full  py-8">
               <Container>
                    <div className="flex  flex-wrap">
                         {posts?.length !== 0 ? (
                              posts?.map((post: PostProps) => (
                                   <div key={post.$id} className="p-2 w-1/4">
                                        <PostCard
                                             $id={post.$id}
                                             image={post.image as string}
                                             title={post.title}
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
