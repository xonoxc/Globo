import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import PostCard from "../components/PostCard"
import { MetroSpinner } from "react-spinners-kit"
import { TextSearch, MoveLeft } from "lucide-react"
import { Container, Button } from "../components"
import Spinner from "../components/spinner/Spinner"
import { postService } from "../services/conf"
import { PostProps } from "@/types"

type SearchResults = Partial<PostProps>[]

export default function SearchResults(): JSX.Element {
     const [posts] = useSearchParams()
     const [results, setResults] = useState<SearchResults>([])
     const [loading, setLoading] = useState<boolean>(false)

     const navigate = useNavigate()

     const postQuery = posts.get("posts")

     const fetchSearchResults = async () => {
          try {
               setLoading(true)
               const response: SearchResults =
                    await postService.getSearchResults(String(postQuery))

               if (Array.isArray(response)) setResults(response)
          } catch (error) {
               console.error(`error fetching search results`, error)
               setResults([])
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          fetchSearchResults()
     }, [])

     if (results.length == 0) {
          return (
               <Container>
                    <div className="w-full py-8 mt-4 text-center">
                         <Container>
                              <div className="flex flex-wrap items-center justify-center">
                                   <div className="alt-container flex items-center w-1/4 justify-center flex-col">
                                        <TextSearch
                                             size={200}
                                             className="text-gray-300"
                                        />
                                        <h2 className="text-center uppercase font-bold text-2xl">
                                             No Matching articles found
                                        </h2>
                                        <p className="text-gray-400">
                                             Looks like there are no articles
                                             matching your search!
                                        </p>
                                        <Button
                                             onClick={() => navigate("/")}
                                             className="text-white flex items-center justify-center mt-2"
                                        >
                                             {loading ? (
                                                  <MetroSpinner />
                                             ) : (
                                                  <span className="flex gap-1 items-center justify-center">
                                                       <MoveLeft size={20} />
                                                       Go back
                                                  </span>
                                             )}
                                        </Button>
                                   </div>
                              </div>
                         </Container>
                    </div>
               </Container>
          )
     }

     return (
          <div className="w-full py-8">
               <Container>
                    <div className="results grid lg:grid-cols-4 md:grid-cols-3  grid-cols-1">
                         {loading ? (
                              <Spinner className="text-black" />
                         ) : (
                              results.map((result, index) => (
                                   <PostCard
                                        key={index}
                                        id={result.id as number}
                                        title={result.title as string}
                                        imageUrl={result.image as string}
                                        displayAvatar
                                        createdAt={result.createdAt as string}
                                        authorAvatar={result.User?.avatar}
                                   />
                              ))
                         )}
                    </div>
               </Container>
          </div>
     )
}
