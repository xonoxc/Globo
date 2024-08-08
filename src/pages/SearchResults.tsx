import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import PostCard from "../components/PostCard"
import { Container } from "../components"
import Spinner from "../components/spinner/Spinner"
import { postService } from "../services/conf"
import { PostProps } from "@/types"

type SearchResults = Partial<PostProps>[]

export default function SearchResults(): JSX.Element {
     const [posts] = useSearchParams()
     const [results, setResults] = useState<SearchResults>([])
     const [loading, setLoading] = useState<boolean>(false)

     const postQuery = posts.get("posts")

     const fetchSearchResults = async () => {
          try {
               setLoading(true)
               const response: SearchResults =
                    await postService.getSearchResults(String(postQuery))

               setResults(response)
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

     return (
          <div className="w-full py-8">
               <Container>
                    <div className="results grid lg:grid-cols-4 md:grid-cols-3  grid-cols-1 ">
                         {loading ? (
                              <Spinner />
                         ) : (
                              results.map((result, index) => (
                                   <PostCard
                                        key={index}
                                        id={result.id as number}
                                        title={result.title as string}
                                        imageUrl={result.image as string}
                                   />
                              ))
                         )}
                    </div>
               </Container>
          </div>
     )
}
