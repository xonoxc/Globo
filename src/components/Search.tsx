import React, { useState, useCallback } from "react"
import { useDebounce } from "use-debounce"
import { Input, Button, Avatar } from "../components"
import { postService } from "../services/conf"
import { Search as SearchIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

type Suggestions = {
	postSuggestions: { title: string }[],
	userAcounts: {
		id: string
		name: string
		avatar: string
	}[]
} | { postSuggestions: [], userAcounts: [] }

const Search: React.FC = () => {
	const [query, setQuery] = useState("")
	const [suggestions, setSuggestions] = useState<Suggestions>({
		postSuggestions: [],
		userAcounts: [],
	})
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
			setSuggestions({
				postSuggestions: [],
				userAcounts: [],
			})
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
		<div className="flex items-center justify-center w-full md:px-4">
			<div className="bg-white rounded-md md:p-4 w-full flex items-center justify-center flex-col">
				<div className="flex w-full md:w-1/2 gap-2">
					<Input
						type="text"
						onChange={e => setQuery(e.target.value)}
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
					<div className="mt-2 text-black-500">Loading...</div>
				)}
				{suggestions?.postSuggestions?.length > 0 && (
					<ul className="md:w-1/2 mt-2 bg-white border rounded-md">
						{suggestions?.postSuggestions.map((sugg, index) => (
							<li
								key={index}
								onClick={() =>
									navigate(
										`/results/search?posts=${encodeURIComponent(sugg.title)}`
									)
								}
								className="p-2 border-b border-gray-200 last:border-none hover:bg-gray-100"
							>
								{sugg.title.length > 0 && sugg.title}
							</li>
						))}
					</ul>
				)}
				{suggestions?.userAcounts?.length > 0 && (
					<ul className="md:w-1/2 mt-2 bg-white border rounded-md">
						{suggestions?.userAcounts.map((acc, index) => (
							<li
								key={index}
								onClick={() =>
									navigate(
										`/u/profile/${acc.id}`
									)
								}
								className="p-2 border-b border-gray-200 last:border-none  hover:bg-gray-100"
							>
								<span className="details flex items-center justify-start gap-3">
									<Avatar imageUrl={acc.avatar} />

									{acc.name}
								</span>
							</li>
						))}
					</ul>
				)
				}

			</div>
		</div>
	)
}

export default Search
