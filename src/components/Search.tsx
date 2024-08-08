import React, { useState, useCallback } from "react"
import { useDebounce } from "use-debounce"
import { Input, Button } from "../components"
import { postService } from "../services/conf"
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

     return (
          <div className=" flex items-center justify-center w-full px-4">
               <div className=" bg-white rounded-md  p-4 w-full flex items-center justify-center flex-col">
                    <div className="flex md:w-1/2 gap-2">
                         <Input
                              type="text"
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search"
                              onKeyDown={handleKeyDown}
                              className="border-black border-2"
                         />

                         <Button
                              textColor="white"
                              className="w-1/3"
                              onClick={handleClick}
                         >
                              Search
                         </Button>
                    </div>
                    {loading && (
                         <div className="mt-2 text-blue-500">Loading...</div>
                    )}
                    {suggestions.length > 0 && (
                         <ul className=" md:w-1/2 mt-2 bg-white  border border-gray-200 rounded-md shadow-md ">
                              {suggestions.map((suggestion, index) => (
                                   <li
                                        key={index}
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
