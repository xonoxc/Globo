import { useEffect, useState } from "react"
import appwriteSerivce from "../appwrite/conf"
import { PostProps } from "../types"
import { Container, PostCard } from "../components"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Text } from "lucide-react"
import { Button } from "../components"
import { MetroSpinner } from "react-spinners-kit"

export default function Home(): JSX.Element {
     const [posts, setPosts] = useState<PostProps[]>([])
     const [loading, setLoading] = useState<boolean>(false)

     const authStatus = useSelector((state: RootState) => state.auth.status)

     const fetchPosts = async () => {
          try {
               setLoading(true)
               const response = await appwriteSerivce.getAllPosts([])
               if (response && response.documents) {
                    const parsedPosts =
                         response.documents as unknown as PostProps[]
                    setPosts(parsedPosts)
               }
          } catch (error) {
               console.error("Error while fetching Posts", error)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          ;(async () => {
               await fetchPosts()
          })()
     }, [])

     const postRefresh = async () => {
          setPosts([])
          await fetchPosts()
     }

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
                              <div className="alt-container flex items-center w-full justify-center flex-col">
                                   <Text size={200} className="text-gray-300" />
                                   <h2 className="text-center uppercase font-bold text-2xl">
                                        No New articles found
                                   </h2>
                                   <p>refresh the feed to get started!</p>
                                   <Button
                                        onClick={postRefresh}
                                        className="text-white mt-2
								w-20"
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
          <div className="w-full py-8">
               <Container>
                    <div className="flex flex-wrap">
                         {posts.map((post) => (
                              <div key={post.$id} className="p-2 w-1/4">
                                   <PostCard
                                        {...post}
                                        image={post.image as string}
                                   ></PostCard>
                              </div>
                         ))}
                    </div>
               </Container>
          </div>
     )
}
