import React, { useState, useCallback } from "react"
import { useDebounce } from "use-debounce"
import { Input, Button } from "../components"
import { postService } from "../services/conf"
import { Search as SearchIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Suggestions = { title: string }[]

const Search: React.FC = () => {
     const [query, setQuery] = useState("")
     const [suggestions, setSuggestions] = useState<Suggestions>([])
     const [loading, setLoading] = useState(false)
     const [debouncedQuery] = useDebounce(query, 2000)

     const navigate = useNavigate()

     const fetchSuggestions = useCallback(async () => {
          try {
               if (debouncedQuery) {
                    setLoading(true)
                    const response: Suggestions =
                         await postService.getSearchSuggestions(debouncedQuery)
                    setSuggestions(response)
               }
          } catch (error) {
               console.error("error while fetching suggestions:", error)
               setSuggestions([])
          } finally {
               setLoading(false)
          }
     }, [debouncedQuery])

     const handleClick = () => {
          if (query.trim()) {
               navigate(`/results/search?posts=${encodeURIComponent(query)}`)
          }
     }

     React.useEffect(() => {
          fetchSuggestions()
     }, [debouncedQuery, fetchSuggestions])

     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
               handleClick()
          }
     }

     const handleSuggestionClick = (suggestion: string) => {
          navigate(`/results/search?posts=${encodeURIComponent(suggestion)}`)
     }

     return (
          <div className="flex items-center justify-center w-full md:px-4">
               <div className="bg-white rounded-md md:p-4 w-full flex items-center justify-center flex-col">
                    <div className="flex w-full md:w-1/2 gap-2">
                         <Input
                              type="text"
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search....."
                              onKeyDown={handleKeyDown}
                              className="flex-grow border-2 p-2"
                         />
                         <div className="btn w-[30%] md:w-[20%] flex items-center justify-center ">
                              <Button
                                   textColor="white"
                                   className="w-auto h-ful px-4 py-3 flex items-center justify-center"
                                   onClick={handleClick}
                              >
                                   <SearchIcon className="h-4" />
                              </Button>
                         </div>
                    </div>
                    {loading && (
                         <div className="mt-2 text-blue-500">Loading...</div>
                    )}
                    {suggestions.length > 0 && (
                         <ul className="md:w-1/2 mt-2 bg-white border rounded-md">
                              {suggestions.map((suggestion, index) => (
                                   <li
                                        key={index}
                                        onClick={() =>
                                             handleSuggestionClick(
                                                  suggestion.title
                                             )
                                        }
                                        className="p-2 border-b border-gray-200 last:border-none hover:bg-gray-100"
                                   >
                                        {suggestion.title}
                                   </li>
                              ))}
                         </ul>
                    )}
               </div>
          </div>
     )
}

export default Search
